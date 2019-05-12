import { IHasId } from 'interfaces';

export interface ITodo extends IHasId {
  title: string;
  completed: boolean;
  created: Date;
}
