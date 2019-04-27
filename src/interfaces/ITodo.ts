import { IHasId } from "./IHasId";
export interface ITodo extends IHasId {
  title: string;
  completed: boolean;
  created: Date;
}
