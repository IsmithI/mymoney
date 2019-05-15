import { Button, Dialog as MuiDialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import { IDialog } from 'interfaces/IDialog';
import { IField } from 'interfaces/IField';
import * as React from 'react';
import { createRef, ReactNode, RefObject } from 'react';
import { FieldsList } from './FieldsList';

export interface IDialogProps<R> extends IDialog<R> {
  title?: string | ReactNode;
  fields?: IField[];
  footer?: ReactNode;
  fullScreen?: boolean;
}

interface IDialogState<R> {
  record: R;
}

export class Dialog<R> extends React.Component<IDialogProps<R>, IDialogState<R>> {
  public state = {
    record: null
  };

  public form: RefObject<HTMLFormElement>;

  constructor(props: IDialogProps<R>) {
    super(props);
    this.form = createRef();
  }

  public render(): React.ReactNode {
    const { isOpen, onCancel, title, fields, footer, fullScreen } = this.props;

    return (
      <MuiDialog open={isOpen} onClose={onCancel} fullScreen={fullScreen}>
        <form ref={this.form} onSubmit={this.handleFormSubmit}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <FieldsList fields={fields} record={this.state.record} onChange={this.updateRecord}/>
          </DialogContent>
          <DialogActions>
            {footer || <DefaultFooter onClose={onCancel} onSubmit={this.handleSubmit}/>}
          </DialogActions>
        </form>
      </MuiDialog>
    );
  }

  public handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.handleSubmit();
    return false;
  }

  public handleSubmit = () => {
    this.props.onSubmit(this.state.record);
  }

  public updateRecord = (key: string) => (value: any) => {
    this.setState({ record: { ...this.state.record, [key]: value } });
  }
}

interface IFooter {
  onClose: () => void;
  onSubmit: () => void;
}

function DefaultFooter({ onClose, onSubmit }: IFooter) {
  return (
    <Grid container spacing={8} justify='flex-end'>
      <Grid item>
        <Button color='primary' onClick={onClose}>
          close
        </Button>
      </Grid>
      <Grid item>
        <Button color='primary' onClick={onSubmit} variant='contained'>
          OK
        </Button>
      </Grid>
    </Grid>
  );
}
