import { Card, CardHeader, Grid, Grow, WithStyles, withStyles } from '@material-ui/core'
import { IProject } from 'interfaces';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styles from './styles';

interface IProps extends RouteChildrenProps, WithStyles<typeof styles> {
  projects: IProject[];
}

export const ProjectsList = withStyles(styles)(withRouter(({ projects, history, classes }: IProps) => {
  const displayProject = (id: string) => () => history.push(`projects/${id}`);

  return (
    <Grid container={true} spacing={16}>
      {projects.map(project => (
        <Grid item={true} key={project.id}>
          <Grow in={true}>
            <Card className={classes.projectCard}>
              <CardHeader title={project.title} onClick={displayProject(project.id)} />
            </Card>
          </Grow>
        </Grid>
      ))}
    </Grid>
  );
}));
