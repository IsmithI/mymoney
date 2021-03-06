import { Grid, Grow } from '@material-ui/core';
import { PageHeader } from 'components';
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
            <PageHeader title='My projects'/>
            <br />
            <ProjectsList projects={projectsStore.entities} />
          </Grid>
        </Grow>

        <AddProjectFab />
      </>
    );
  }
}
