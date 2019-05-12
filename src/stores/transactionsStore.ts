import { ITransaction } from 'interfaces';
import { computed } from 'mobx';
import { EntityStore } from './entityStore';

export interface ITransactionsStore extends TransactionsStore {
  lastTransactions: ITransaction[];
}

class TransactionsStore extends EntityStore<ITransaction> {
  constructor() {
    super('transactions');
  }

  @computed
  get lastTransactions() {
    return [...this.entities]
      .sort((a, b) => (a.date && b.date ? (a.date > b.date ? 1 : 0) : 0))
      .slice(0, 4);
  }
}

export const transactionsStore = new TransactionsStore();
