import { ReactNode } from "react";
import { IFieldsList } from "../components/Dialog/FieldsList";

type FieldType = "text" | "number" | "date" | "boolean" | "entity";

export interface IField {
	title: string;
	key: string;
	type: FieldType;
	render?: <R>(data: IFieldsList<R>) => ReactNode;
}
