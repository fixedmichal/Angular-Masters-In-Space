import { ChangeDetectionStrategy, Component, input, linkedSignal, output } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { LaunchesQueryParams } from 'space-api/types';

@Component({
  selector: 'app-launches-filters',
  imports: [FormField],
  templateUrl: './launches-filters.component.html',
  styleUrls: ['./launches-filters.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LaunchesFiltersComponent {
  paramsChange = output<LaunchesQueryParams>();
  params = input.required<LaunchesQueryParams>();

  filtersModel = linkedSignal({
    source: this.params,
    computation: (params) => params,
  });

  filtersForm = form(this.filtersModel);

  search(): void {
    this.paramsChange.emit(this.filtersModel());
  }
}
