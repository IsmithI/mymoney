import { Toggler } from '@ismithi/react-utils';
import { Icon, WithStyles, withStyles } from '@material-ui/core';
import { Fab } from "components/Fab";
import { IProject, ITask } from 'interfaces';
import { inject } from 'mobx-react';
import * as React from 'react';
import { IProjectsStore } from 'stores/projectsStore';
import { projectsDialogFactory } from 'utils/factory/ProjectsDialogFactory';
import styles from './styles';

const Dialog = projectsDialogFactory.createAddTaskDialog();

interface IProps extends WithStyles<typeof styles> {
  projectsStore?: IProjectsStore;
  project: IProject;
}

const Component = ({ projectsStore, classes, project }: IProps) => {
  const handleSubmit = (close: () => void) => (task: ITask) =>
    projectsStore
      .addTask(project)(task)
      .then(projectsStore.load)
      .then(close);

  return (
    <Toggler>
      {({ isOpen, close, open }) => (
        <>
          <Fab className={classes.fab} onClick={open}>
            <Icon fontSize='large'>add</Icon>
          </Fab>
          <Dialog isOpen={isOpen} onCancel={close} onSubmit={handleSubmit(close)}/>
        </>
      )}
    </Toggler>
  );
};

export const AddTaskDialog = inject('projectsStore')(withStyles(styles)(Component));
