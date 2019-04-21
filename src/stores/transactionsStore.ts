import { ITransaction } from "./../interfaces/ITransaction";
import { EntityStore } from "./entityStore";
import { computed } from "mobx";

class TransactionsStore extends EntityStore<ITransaction> {
  constructor() {
    super("transactions");
  }

  @computed
  get entitiesData() {
    return this.entities.map(e => ({
      id: e.id,
      ...(e.data() as ITransaction),
      date: new Date(e.data().date.seconds * 1000)
    }));
  }
}

export const transactionsStore = new TransactionsStore();
