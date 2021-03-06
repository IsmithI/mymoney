import { IField } from 'interfaces';
import { DialogBuilder } from './DialogBuilder';

export class FieldsBuilder<R> {
  private readonly parent: DialogBuilder<R>;
  private dialogFields: Array<IField<R>> = [];

  constructor(parent: DialogBuilder<R>) {
    this.parent = parent;
  }

  public add = (f: IField<R>) => {
    this.dialogFields.push(f);
    return this;
  }

  public get = () => {
    this.parent.setFields(this.dialogFields);
    return this.parent;
  }
}
