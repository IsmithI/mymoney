import { Card, CardHeader, Grid, Grow } from '@material-ui/core';
import { IProject } from 'interfaces';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';

interface IProps extends RouteChildrenProps {
  projects: IProject[];
}

export const ProjectsList = withRouter(({ projects, history }: IProps) => {
  const displayProject = (id: string) => () => history.push(`projects/${id}`);

  return (
    <Grid container={true} spacing={16}>
      {projects.map(project => (
        <Grid item={true} key={project.id}>
          <Grow in={true}>
            <Card>
              <CardHeader title={project.title} onClick={displayProject(project.id)} />
            </Card>
          </Grow>
        </Grid>
      ))}
    </Grid>
  );
});
