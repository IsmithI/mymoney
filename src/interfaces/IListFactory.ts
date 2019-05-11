import { ReactElement } from "react";
import { IListProps } from "../components/List";
import { IHasId } from "./IHasId";

export interface IListFactory<R extends IHasId> {
  createEntityList: () => (props: IListProps<R>) => ReactElement<typeof props>;
}