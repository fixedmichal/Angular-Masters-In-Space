import { Component, inject } from '@angular/core';
import { MoonsService } from 'space-api/services';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-moons',
  templateUrl: './moons.component.html',
  styleUrl: './moons.component.css',
  imports: [AsyncPipe],
})
export default class MoonsComponent {
  private moonService = inject(MoonsService);

  protected readonly query = new BehaviorSubject<string>('');
  protected readonly includePlanets = new BehaviorSubject<boolean>(false);

  protected readonly moons = combineLatest([
    this.query.pipe(debounceTime(800)),
    this.includePlanets,
  ]).pipe(
    switchMap(([query, includePlanets]) =>
      this.moonService.getMoons({ query, includePlanets }),
    ),
  );

  protected toggleIncludePlanets() {
    this.includePlanets.next(!this.includePlanets.value);
  }
}
