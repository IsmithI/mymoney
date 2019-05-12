import { IProject } from 'interfaces';
import { EntityStore } from './entityStore';

class ProjectsStore extends EntityStore<IProject> {}

export const projectsStore = new ProjectsStore('projects');
