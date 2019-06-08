import { IProject, ITask, statusesArray, TaskStatus } from 'interfaces';
import { action } from 'mobx';
import { EntityStore } from './entityStore';

export interface IProjectsStore extends EntityStore<IProject> {
  addTask: (project: IProject) => (task: ITask) => Promise<any>;
  upgradeStatus: (task: ITask) => (project: IProject) => void;
}

class ProjectsStore extends EntityStore<IProject> implements IProjectsStore {
  constructor() {
    super('projects');
  }

  @action
  public add(project: IProject) {
    if (!project.tasks) {
      project.tasks = [];
    }

    return super.add(project);
  }

  @action
  public load() {
    return super.load().then(() => {
      this.entities.forEach(e => (e.tasks = e.tasks || []));
      return this.entities;
    });
  }

  @action
  public addTask = (project: IProject) => (task: ITask) => {
    project.tasks.push(fillDefaultParams(task));
    return this.save(project);
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

export const projectsStore = new ProjectsStore();
