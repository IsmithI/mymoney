import { IDialogProps } from 'components';
import { ReactElement } from 'react';

export type DialogElement<R> = (props: IDialogProps<R>) => ReactElement<typeof props>;

export interface IDialogFactory<R> {
  createAddEntityDialog: () => DialogElement<R>;
}
