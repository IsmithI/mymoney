import { Grid, Grow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { PageHeader } from 'components';
import { IProject, ITask } from 'interfaces';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RouteChildrenProps } from 'react-router';
import { IProjectsStore } from 'stores/projectsStore';
import { AddTaskDialog } from './AddTaskDialog';
import styles from './styles';
import { TasksColumn } from './TasksColumn';

interface IProjectBoard extends RouteChildrenProps<any>, WithStyles<typeof styles> {
  projectsStore?: IProjectsStore;
}

@inject('projectsStore')
@observer
class Component extends React.Component<IProjectBoard> {
  public componentDidMount = () => {
    this.props.projectsStore.load();
  }

  public findBy = (project: IProject) => (status: string) => {
    return (project.tasks || []).filter(task => task.status === status);
  }

  public handleDelete = (task: ITask) => {
    return this.props.projectsStore.delete(task.id);
  }

  public handleStatusUpgrade = (project: IProject) => (task: ITask) => {
    this.props.projectsStore.upgradeStatus(task)(project);
  }

  public render() {
    const { classes, projectsStore, match } = this.props;
    const project = projectsStore.entities.find(e => e.id === match.params.id);
    const find = this.findBy(project);

    return project ? (
      <>
        <Grid container direction='column' spacing={16}>
          <Grid item>
            <PageHeader title={project.title} />
          </Grid>
          <Grid item>
            <Grow in={true}>
              <Grid container justify='space-around' spacing={16}>
                <Grid item xs={12} sm={3}>
                  <Typography align='center' className={classes.statusTitle} variant='title'>
                    Pending
                  </Typography>
                  <br />
                  <TasksColumn
                    tasks={find('pending')}
                    onDelete={this.handleDelete}
                    onStatusUpgrade={this.handleStatusUpgrade(project)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align='center' className={classes.statusTitle} variant='title'>
                    In progress
                  </Typography>
                  <br />
                  <TasksColumn
                    tasks={find('in_progress')}
                    onDelete={this.handleDelete}
                    onStatusUpgrade={this.handleStatusUpgrade(project)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align='center' className={classes.statusTitle} variant='title'>
                    Testing
                  </Typography>
                  <br />
                  <TasksColumn
                    tasks={find('testing')}
                    onDelete={this.handleDelete}
                    onStatusUpgrade={this.handleStatusUpgrade(project)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography align='center' className={classes.statusTitle} variant='title'>
                    Done
                  </Typography>
                  <br />
                  <TasksColumn
                    tasks={find('done')}
                    onDelete={this.handleDelete}
                    onStatusUpgrade={this.handleStatusUpgrade(project)}
                  />
                </Grid>
              </Grid>
            </Grow>
          </Grid>
        </Grid>

        <AddTaskDialog project={project} />
      </>
    ) : (
      <></>
    );
  }
}

export const ProjectBoard = withStyles(styles)(Component);
