import { firebaseStore } from './firebaseStore';
import { projectsStore } from './projectsStore';
import { weatherStore } from './weatherStore';

import { ICategory } from 'interfaces';
import { EntityStore } from './entityStore';
import { todoStore } from './todoStore';
import { transactionsStore } from './transactionsStore';

export const stores = {
  firebaseStore,
  categoriesStore: new EntityStore<ICategory>('categories'),
  transactionsStore,
  todoStore,
  weatherStore,
  projectsStore
};
