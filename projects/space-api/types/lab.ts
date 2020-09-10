import { LabDetails } from './lab-details';
import { Equipment } from './equipment';

export interface Lab {
  id: number | null;
  details: LabDetails;
  equipments: Equipment[];
}
