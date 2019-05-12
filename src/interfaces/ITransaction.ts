import { IHasId } from 'interfaces';

export interface ITransaction extends ITransactionModel, IHasId {}

export interface ITransactionModel {
  category: string;
  date?: Date;
  amount: number;
  comment?: string;
}
