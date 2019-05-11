import { ReactElement } from "react";
import { IDialogProps } from "../components/Dialog";

export interface IDialogFactory<R> {
  createAddEntityDialog: () => (props: IDialogProps<R>) => ReactElement<typeof props>;
}
