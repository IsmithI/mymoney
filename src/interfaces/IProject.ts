import { ITask } from 'interfaces';

export interface IProject {
  id: string;
  title: string;
  tasks: ITask[];
}
