import { firebaseStore } from "./firebaseStore";

import { ICategory } from "../interfaces/ICategory";
import { EntityStore } from "./entityStore";
import { todoStore } from "./todoStore";
import { transactionsStore } from "./transactionsStore";

export const stores = {
  firebaseStore,
  categoriesStore: new EntityStore<ICategory>("categories"),
  transactionsStore,
  todoStore
};
