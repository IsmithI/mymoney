import { IDialogFactory, ITodo } from 'interfaces';
import { DialogBuilder } from 'utils/builder/DialogBuilder';

class TodoDialogFactory implements IDialogFactory<ITodo> {
  public createAddEntityDialog = () => {
    return new DialogBuilder()
      .title('Add ToDo')
      .withFields()
      .add({
        key: 'title',
        title: 'Title',
        type: 'text'
      })
      .add({
        key: 'completed',
        title: 'Completed',
        type: 'boolean'
      })
      .get()
      .make();
  }
}

export const todoDialogFactory = new TodoDialogFactory();
