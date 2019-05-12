import { Dialog, IDialogProps } from 'components';
import { DialogElement, IField } from 'interfaces';
import * as React from 'react';
import { ReactNode } from 'react';
import { FieldsBuilder } from './FieldsBuilder';

interface IDialogBuilder<R> {
  make: () => DialogElement<R>;
}

export class DialogBuilder<R> implements IDialogBuilder<R> {
  private dialogTitle: string | ReactNode = '';
  private dialogFields: Array<IField<R>> = [];
  private dialogFooter: ReactNode;
  private fullScreen: boolean = false;

  public title = (title: string) => {
    this.dialogTitle = title;
    return this;
  }

  public withFields = (): FieldsBuilder<R> => {
    return new FieldsBuilder<R>(this);
  }

  public footer = (footer: ReactNode) => {
    this.dialogFooter = footer;
    return this;
  }

  public setFields = (fields: Array<IField<R>>) => {
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
