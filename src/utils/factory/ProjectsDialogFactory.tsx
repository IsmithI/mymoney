import { IDialogFactory, IProject, ITask } from 'interfaces';
import { DialogBuilder } from 'utils/builder/DialogBuilder';

class ProjectsDialogFactory implements IDialogFactory<IProject> {
  public createAddEntityDialog = () =>
    new DialogBuilder<IProject>()
      .title('Create new project')
      .withFields()
      .add({
        key: 'title',
        title: 'Project name',
        type: 'text'
      })
      .get()
      .make()

  public createAddTaskDialog = () =>
    new DialogBuilder<ITask>()
      .title('Add task')
      .withFields()
      .add({
        key: 'title',
        title: 'Task',
        type: 'text'
      })
      .add({
        key: 'comments',
        title: 'Comments',
        type: 'longtext'
      })
      .get()
      .make()
}

export const projectsDialogFactory = new ProjectsDialogFactory();
