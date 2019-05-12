import { IHasId } from 'interfaces';

export interface ICategory extends IHasId {
  icon: string;
  name: string;
}
