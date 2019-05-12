import { Grid, Icon, IconButton } from '@material-ui/core';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styles from './Toolbar.scss';

const ToolbarBase = ({  }: RouteChildrenProps) => {
  return (
    <nav className={styles.toolbar}>
      <Grid container={true}>
        <Grid item={true}>
          <IconButton>
            <Icon>home</Icon>
          </IconButton>
        </Grid>
      </Grid>
    </nav>
  );
};

export const Toolbar = withRouter(ToolbarBase);
