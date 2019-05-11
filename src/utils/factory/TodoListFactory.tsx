import * as React from "react";
import { TodoListItem } from "../../components/widgets/TodoList/TodoListItem";
import { IListFactory } from "../../interfaces/IListFactory";
import { ITodo } from "../../interfaces/ITodo";
import { ListBuilder } from "../builder/ListBuilder";

class TodoListFactory implements IListFactory<ITodo> {

  public createEntityList = () => new ListBuilder<ITodo>()
    .itemRenderer(item => <TodoListItem key={item.id} record={item}/>)
    .make()
}

export const todoListFactory = new TodoListFactory();