import { Toggler } from '@ismithi/react-utils';
import { Fab, Grow, Icon, withStyles, WithStyles } from '@material-ui/core';
import { IProject } from 'interfaces';
import { inject } from 'mobx-react';
import * as React from 'react';
import { IEntityStore } from 'stores/entityStore';
import { projectsDialogFactory } from 'utils/factory/ProjectsDialogFactory';
import styles from './styles';

const AddProjectDialog = projectsDialogFactory.createAddEntityDialog();

interface IProps extends WithStyles<typeof styles> {
  projectsStore?: IEntityStore<IProject>;
}

const Component = ({ classes, projectsStore }: IProps) => {
  const handleSubmit = (close: () => void) => (record: IProject) =>
    projectsStore.add(record).then(close);

  return (
    <Toggler>
      {({ isOpen, open, close }) => (
        <>
          <Grow in={true}>
            <Fab onClick={open} className={classes.fab}>
              <Icon>add_circle</Icon>
            </Fab>
          </Grow>
          <AddProjectDialog isOpen={isOpen} onCancel={close} onSubmit={handleSubmit(close)} />
        </>
      )}
    </Toggler>
  );
};

export const AddProjectFab = withStyles(styles)(inject('projectsStore')(Component));
