import { ITransaction } from "./../interfaces/ITransaction";
import { EntityStore } from "./entityStore";
import { computed } from "mobx";

export interface ITransactionsStore extends TransactionsStore {
  lastTransactions: ITransaction[];
}

class TransactionsStore extends EntityStore<ITransaction> {
  constructor() {
    super("transactions");
  }

  @computed
  get lastTransactions() {
    return [...this.entitiesData]
      .sort((a, b) => (a.date && b.date ? (a.date > b.date ? 1 : 0) : 0))
      .slice(0, 4);
  }

  @computed
  public get entitiesData() {
    return this.entities.map(e => {
      return {
        id: e.id,
        ...(e.data() as ITransaction),
        date: new Date(e.data().date.seconds * 1000)
      } as ITransaction;
    });
  }
}

export const transactionsStore = new TransactionsStore();
