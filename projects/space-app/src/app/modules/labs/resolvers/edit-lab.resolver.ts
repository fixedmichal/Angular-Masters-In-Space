import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { LabsService } from 'space-api/services';
import { Lab } from 'space-api/types';
import { tap } from 'rxjs/operators';

export const editLabResolver: ResolveFn<Lab> = (route) => {
  return inject(LabsService).getLab(+route.params['id']).pipe(
    tap({error: () => alert('Nie udało się załadować danych.')})
  );
}
