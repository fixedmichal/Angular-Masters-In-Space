import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoonsService } from 'space-api/services';
import { Moon } from 'space-api/types';
import { of } from 'rxjs';

import { LabMoonIdSelectorComponent } from './lab-moon-id-selector.component';

describe('LabMoonIdSelectorComponent', () => {
  let component: LabMoonIdSelectorComponent;
  let fixture: ComponentFixture<LabMoonIdSelectorComponent>;

  const moons: Moon[] = [
    { id: 1, planet: 'Mars', name: 'Fobos', description: '', imageUrl: '', wikiLink: '' },
    { id: 2, planet: 'Mars', name: 'Deimos', description: '', imageUrl: '', wikiLink: '' },
    { id: 3, planet: 'Ziemia', name: 'Księżyc', description: '', imageUrl: '', wikiLink: '' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabMoonIdSelectorComponent],
      providers: [{
        provide: MoonsService,
        useValue: { getMoons: () => of(moons) },
      }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabMoonIdSelectorComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('value', 1);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list moons for the selected planet', () => {
    expect(component.selectedPlanet()).toBe('Mars');
    expect(component.moonOptions().map((moon) => moon.name)).toEqual(['Fobos', 'Deimos']);
  });

  it('should clear the selected moon when changing to a different planet', () => {
    component.onPlanetChange('Ziemia');

    expect(component.selectedPlanet()).toBe('Ziemia');
    expect(component.value()).toBeNull();
    expect(component.moonOptions().map((moon) => moon.name)).toEqual(['Księżyc']);
  });

  it('should update the selected moon value', () => {
    component.onMoonChange('2');

    expect(component.value()).toBe(2);
    expect(component.selectedMoon()?.name).toBe('Deimos');
  });
});
