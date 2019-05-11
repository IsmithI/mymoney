import { Load, Toggler } from "@ismithi/react-utils";
import { Card, CardHeader, Grow, Icon, IconButton } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { ITodo } from "../../../interfaces/ITodo";
import { ITodoStore } from "../../../stores/todoStore";
import { todoListFactory } from "../../../utils/factory/TodoListFactory";
import { AddTodoItem } from "./AddTodoItem";

interface IProps {
  todoStore?: ITodoStore;
}

const CustomList = todoListFactory.createEntityList();

export const TodoList = inject("todoStore")(
  observer(({ todoStore }: IProps) => {
    const handleItemSave = (close: () => void) => (item: ITodo) => {
      return todoStore.add({ ...item, created: new Date(), completed: !!item.completed }).then(close);
    };

    return (
      <Toggler>
        {({ isOpen, close, open }) => (
          <Load instantly={true} on={todoStore.load}>
            {({ loaded }) => (
              <Grow in={loaded}>
                <Card>
                  <CardHeader
                    title="Todos"
                    titleTypographyProps={{ variant: "title" }}
                    action={
                      <IconButton onClick={open}>
                        <Icon>add_circle</Icon>
                      </IconButton>
                    }
                  />
                  <CustomList items={todoStore.todos}/>
                  <AddTodoItem
                    isOpen={isOpen}
                    onCancel={close}
                    onSubmit={handleItemSave(close)}
                  />
                </Card>
              </Grow>
            )}
          </Load>
        )}
      </Toggler>
    );
  }),
);
