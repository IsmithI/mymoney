import { IDialogProps } from 'components';
import { ReactElement } from 'react';

export type DialogElement<R> = (props: IDialogProps<R>) => ReactElement<IDialogProps<R>>;

export interface IDialogFactory<R> {
  createAddEntityDialog: () => DialogElement<R>;
}
