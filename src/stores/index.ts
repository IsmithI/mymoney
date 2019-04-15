import { firebaseStore } from './firebaseStore';
import { EntityStore } from "./entityStore";

import { ICategory } from "../interfaces/ICategory";
import { ITransaction } from "../interfaces/ITransaction";

export const stores = {
  firebaseStore,
  categoriesStore: new EntityStore<ICategory>("categories"),
  transactionsStore: new EntityStore<ITransaction>("transactions"),
};
