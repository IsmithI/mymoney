import { Grid, Grow, Typography } from '@material-ui/core';
import { BackButton } from 'components';
import { IProject } from 'interfaces';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { IEntityStore } from 'stores/entityStore';
import { AddProjectFab } from './AddProjectFab';
import { ProjectsList } from './ProjectsList';

interface IProjectsView {
  projectsStore: IEntityStore<IProject>;
}

@inject('projectsStore')
@observer
export class ProjectsView extends React.Component<IProjectsView> {
  public componentDidMount = () => {
    this.props.projectsStore.load();
  }

  public render() {
    const { projectsStore } = this.props;

    return (
      <>
        <Grow in={true}>
          <Grid>
            <Grid container={true} spacing={16}>
              <Grid item={true}>
                <BackButton />
              </Grid>
              <Grid item={true}>
                <Typography variant='h2'>My projects</Typography>
              </Grid>
            </Grid>
            <br />
            <ProjectsList projects={projectsStore.entitiesData} />
          </Grid>
        </Grow>

        <AddProjectFab />
      </>
    );
  }
}
