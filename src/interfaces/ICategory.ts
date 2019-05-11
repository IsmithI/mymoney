import { IHasId } from "./IHasId";

export interface ICategory extends IHasId {
  icon: string;
  name: string;
}
