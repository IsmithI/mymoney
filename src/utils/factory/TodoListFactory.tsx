import { TodoListItem } from 'components/widgets/TodoList';
import { IListFactory, ITodo } from 'interfaces';
import * as React from 'react';
import { ListBuilder } from 'utils/builder/ListBuilder';

class TodoListFactory implements IListFactory<ITodo> {
  public createEntityList = () =>
    new ListBuilder<ITodo>()
      .itemRenderer(item => <TodoListItem key={item.id} record={item} />)
      .make()
}

export const todoListFactory = new TodoListFactory();
