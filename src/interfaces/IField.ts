import { IFieldsList } from 'components/Dialog/FieldsList';
import { ReactNode } from 'react';

type FieldType = 'text' | 'longtext' | 'number' | 'date' | 'boolean' | 'entity';

export interface IField<R = any> {
  title: string;
  key: string;
  type: FieldType;
  render?: (data: IFieldsList<R>) => ReactNode;
}
