import { ResolveFn } from '@angular/router';
import { Lab } from 'space-api/types';

export const createLabResolver: ResolveFn<Lab> = () => {
  return {
    id: null,
    details: {name: '', moonId: null, autonomous: false, enableTags: false},
    equipments: [],
  };
}
