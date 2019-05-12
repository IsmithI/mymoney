import { IFieldsList } from 'components/Dialog/FieldsList';
import { ReactNode } from 'react';

type FieldType = 'text' | 'number' | 'date' | 'boolean' | 'entity';

export interface IField {
  title: string;
  key: string;
  type: FieldType;
  render?: <R>(data: IFieldsList<R>) => ReactNode;
}
