import { Toggler } from '@ismithi/react-utils';
import { Fab, Icon, WithStyles, withStyles } from '@material-ui/core';
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
      .then(close);

  return (
    <Toggler>
      {({ isOpen, close, open }) => (
        <>
          <Fab className={classes.fab} onClick={open}>
            <Icon>add_circle</Icon>
          </Fab>
          <Dialog isOpen={isOpen} onCancel={close} onSubmit={handleSubmit(close)} />
        </>
      )}
    </Toggler>
  );
};

export const AddTaskDialog = inject('projectsStore')(withStyles(styles)(Component));
