import { Dialog, IDialogProps } from 'components';
import { IField } from 'interfaces';
import * as React from 'react';
import { ReactElement, ReactNode } from 'react';
import { FieldsBuilder } from './FieldsBuilder';

interface IDialogBuilder<R> {
  make: () => (props: IDialogProps<R>) => ReactElement<IDialogProps<R>>;
}

export class DialogBuilder<R> implements IDialogBuilder<R> {
  private dialogTitle: string | ReactNode = '';
  private dialogFields: IField[] = [];
  private dialogFooter: ReactNode;
  private fullScreen: boolean = false;

  public title = (title: string) => {
    this.dialogTitle = title;
    return this;
  }

  public withFields = () => {
    return new FieldsBuilder(this);
  }

  public footer = (footer: ReactNode) => {
    this.dialogFooter = footer;
    return this;
  }

  public setFields = (fields: IField[]) => {
    this.dialogFields = fields;
  }

  public isFullScreen(fullScreen: boolean) {
    this.fullScreen = fullScreen;
    return this;
  }

  public make = () => {
    return (props: IDialogProps<R>) => {
      return (
        <Dialog
          title={this.dialogTitle}
          footer={this.dialogFooter}
          fields={this.dialogFields}
          fullScreen={this.fullScreen}
          {...props}
        />
      );
    };
  }
}
