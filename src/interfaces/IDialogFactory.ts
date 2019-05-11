import { IDialogProps } from "../components/Dialog";
import { ReactElement } from "react";

export interface IDialogFactory<R> {
	createAddEntityDialog: () => (props: IDialogProps<R>) => ReactElement<typeof props>;
}