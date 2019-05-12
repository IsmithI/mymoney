import { IHasId } from './IHasId';

export type TaskStatus = 'pending' | 'in_progress' | 'testing' | 'done';
export const statusesArray = ['pending', 'in_progress', 'testing', 'done'];

export interface ITask extends IHasId {
  title: string;
  comments?: string;
  created: any;
  closedAt?: any;
  status: TaskStatus;
}
