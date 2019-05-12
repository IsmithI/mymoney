import { Load } from '@ismithi/react-utils';
import { Grid, Grow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { BackButton } from 'components';
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

const Component = ({ projectsStore, match, classes }: IProjectBoard) => {
  const handleLoad = () => projectsStore.get(match.params.id);

  return (
    <Load instantly={true} on={handleLoad}>
      {({ loaded, data }) => {
        if (!data) {
          return <></>;
        }
        const grouped = projectsStore.groupTasksOf(data);

        return (
          <>
            <Grid container={true} direction='column' spacing={16}>
              <Grid item={true}>
                <Grow in={loaded}>
                  <Grid container={true} spacing={16}>
                    <Grid item={true}>
                      <BackButton />
                    </Grid>
                    <Grid item={true}>
                      <Typography variant='h3'>{data.title}</Typography>
                    </Grid>
                  </Grid>
                </Grow>
              </Grid>
              <Grid item={true}>
                <Grow in={true}>
                  <Grid container={true} justify='space-around' spacing={16}>
                    <Grid item={true} xs={12} sm={3}>
                      <Typography align='center' className={classes.statusTitle} variant='title'>
                        Pending
                      </Typography>
                      <br />
                      <TasksColumn tasks={grouped.pending || []} />
                    </Grid>
                    <Grid item={true} xs={12} sm={3}>
                      <Typography align='center' className={classes.statusTitle} variant='title'>
                        In progress
                      </Typography>
                      <br />
                      <TasksColumn tasks={grouped.in_progress || []} />
                    </Grid>
                    <Grid item={true} xs={12} sm={3}>
                      <Typography align='center' className={classes.statusTitle} variant='title'>
                        Testing
                      </Typography>
                      <br />
                      <TasksColumn tasks={grouped.testing || []} />
                    </Grid>
                    <Grid item={true} xs={12} sm={3}>
                      <Typography align='center' className={classes.statusTitle} variant='title'>
                        Done
                      </Typography>
                      <br />
                      <TasksColumn tasks={grouped.done || []} />
                    </Grid>
                  </Grid>
                </Grow>
              </Grid>
            </Grid>

            <AddTaskDialog project={data} />
          </>
        );
      }}
    </Load>
  );
};

export const ProjectBoard = inject('projectsStore')(observer(withStyles(styles)(Component)));
