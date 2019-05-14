import { ITodo } from 'interfaces';
import { action, computed } from 'mobx';
import { EntityStore } from './entityStore';

export interface ITodoStore extends TodoStore {
  todos: ITodo[];
}

class TodoStore extends EntityStore<ITodo> implements ITodoStore {
  constructor() {
    super('todo');
  }

  @computed
  get todos() {
    return this.entities.sort((a, b) => {
      return a.created < b.created ? 1 : a.created > b.created ? -1 : 0;
    });
  }

  @action
  public toggleTodo = (todo: ITodo) => (completed: boolean) => {
    const data = { ...todo, completed };
    return this.save(data).then(this.load);
  }
}

export const todoStore = new TodoStore();
