import { IProject, ITask, statusesArray, TaskStatus } from 'interfaces';
import { action } from 'mobx';
import { EntityStore } from './entityStore';

export interface IProjectsStore extends EntityStore<IProject> {
  addTask: (project: IProject) => (task: ITask) => Promise<any>;
  upgradeStatus: (task: ITask) => (project: IProject) => void;
}

class ProjectsStore extends EntityStore<IProject> implements IProjectsStore {
  @action
  public addTask = (project: IProject) => (task: ITask) => {
    const tasks = project.tasks || [];
    return this.save({ ...project, tasks: [...tasks, fillDefaultParams(task)] });
  }

  @action
  public upgradeStatus = (task: ITask) => (project: IProject) => {
    const newTask = this.entities
      .find(e => e.id === project.id)
      .tasks.find(t => t.created.nanoseconds === task.created.nanoseconds);

    newTask.status = nextStatus(newTask.status);

    return this.save(project);
  }
}

function fillDefaultParams(task: ITask): ITask {
  return {
    ...task,
    created: new Date(),
    status: 'pending'
  } as ITask;
}

function nextStatus(status: string) {
  const i = statusesArray.findIndex(s => s === status) || 0;
  return (statusesArray[i + 1] || statusesArray[statusesArray.length - 1]) as TaskStatus;
}

export const projectsStore = new ProjectsStore('projects');
