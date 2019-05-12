import { IProject, ITask } from 'interfaces';
import { action } from 'mobx';
import { EntityStore } from './entityStore';

export interface IProjectsStore extends EntityStore<IProject> {
  addTask: (project: IProject) => (task: ITask) => Promise<any>;
  groupTasksOf: (project: IProject) => any;
}

class ProjectsStore extends EntityStore<IProject> implements IProjectsStore {
  @action
  public addTask = (project: IProject) => (task: ITask) => {
    const tasks = project.tasks || [];
    return this.save({ ...project, tasks: [...tasks, this.getTask(task)] });
  }

  public groupTasksOf = (project: IProject) => {
    return project.tasks.reduce((group: any, task: ITask) => {
      group[task.status] = group[task.status] || [];
      group[task.status].push(task);
      return group;
    }, {});
  }

  private getTask(task: ITask): ITask {
    return {
      ...task,
      created: new Date(),
      status: 'pending'
    } as ITask;
  }
}

export const projectsStore = new ProjectsStore('projects');
