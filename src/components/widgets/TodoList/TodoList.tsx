import { Load, Toggler } from '@ismithi/react-utils';
import { Card, CardHeader, Collapse, Icon, IconButton } from '@material-ui/core';
import { ITodo } from 'interfaces/ITodo';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { ITodoStore } from 'stores/todoStore';
import { todoListFactory } from 'utils/factory/TodoListFactory';
import { AddTodoItem } from './AddTodoItem';

interface IProps {
  todoStore?: ITodoStore;
}

const CustomList = todoListFactory.createEntityList();

@inject('todoStore')
@observer
export class TodoList extends React.Component<IProps> {

  public handleItemSave = (close: () => void) => (item: ITodo) => {
    return this.props.todoStore
      .add({ ...item, created: new Date(), completed: !!item.completed })
      .then(close);
  }

  public handleChange = (item: ITodo) => {
    const i = this.props.todoStore.entities.findIndex(e => e.id === item.id);
    this.props.todoStore.entities[i] = item;
    this.props.todoStore.save(item);
  }

  public handleDelete = (item: ITodo) => {
    this.props.todoStore.delete(item.id);
  }

  public render() {
    const { todoStore: { todos, load } } = this.props;

    return (
      <Toggler>
        {({ isOpen, close, open }) => (
          <Load instantly={true} on={load}>
            {({ loaded }) => (
              <Card>
                <CardHeader
                  title='Todos'
                  titleTypographyProps={{ variant: 'title' }}
                  action={
                    <IconButton onClick={open}>
                      <Icon>add_circle</Icon>
                    </IconButton>
                  }
                />
                <Collapse in={loaded}>
                  <div>
                    <CustomList items={todos} onItemChange={this.handleChange} onItemDelete={this.handleDelete}/>
                  </div>
                </Collapse>
                <AddTodoItem isOpen={isOpen} onCancel={close} onSubmit={this.handleItemSave(close)}/>
              </Card>
            )}
          </Load>
        )}
      </Toggler>
    );
  }
}