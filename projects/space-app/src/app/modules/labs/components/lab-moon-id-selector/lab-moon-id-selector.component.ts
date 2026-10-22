import {
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  model,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormValueControl } from '@angular/forms/signals';
import { MoonsService } from 'space-api/services';
import { Moon } from 'space-api/types';

@Component({
  selector: 'app-lab-moon-id-selector',
  templateUrl: './lab-moon-id-selector.component.html',
  styleUrl: './lab-moon-id-selector.component.scss',
})
export class LabMoonIdSelectorComponent implements FormValueControl<
  number | null
> {
  private readonly moonService = inject(MoonsService);
  private readonly moons = toSignal(this.moonService.getMoons(), {
    initialValue: [] as Moon[],
  });

  readonly value = model.required<number | null>();
  readonly invalid = input(false);

  readonly selectedMoon = computed(
    () => this.moons().find((moon) => moon.id === this.value()) ?? null,
  );
  readonly selectedPlanet = linkedSignal({
    source: this.selectedMoon,
    computation: (moon, previous) => moon?.planet ?? previous?.value ?? '',
  });
  readonly planetOptions = computed(() => [
    ...new Set(this.moons().map((moon) => moon.planet)),
  ]);
  readonly moonOptions = computed(() =>
    this.moons().filter((moon) => moon.planet === this.selectedPlanet()),
  );

  onPlanetChange(planet: string): void {
    this.selectedPlanet.set(planet);
    if (this.selectedMoon()?.planet !== planet) {
      this.value.set(null);
    }
  }

  onMoonChange(moonId: string): void {
    this.value.set(moonId ? Number(moonId) : null);
  }
}
