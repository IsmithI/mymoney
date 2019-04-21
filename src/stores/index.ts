import { firebaseStore } from "./firebaseStore";
import { transactionsStore } from "./transactionsStore";
import { EntityStore } from "./entityStore";

import { ICategory } from "../interfaces/ICategory";

export const stores = {
  firebaseStore,
  categoriesStore: new EntityStore<ICategory>("categories"),
  transactionsStore: transactionsStore
};
