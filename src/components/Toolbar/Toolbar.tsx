import { Grid, Icon, IconButton } from '@material-ui/core';
import { items } from 'config/toolbar';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styles from './Toolbar.module.scss';

const ToolbarBase = ({ history }: RouteChildrenProps) => {
  const nextPage = (path: string) => () => history.push(path);
  return (
    <nav className={styles.toolbar}>
        <Grid container={true} spacing={8}>
          {items.map(item => (
            <Grid item={true} key={item.id}>
              <IconButton onClick={nextPage(item.path)}>
                <Icon fontSize='large' color='primary'>{item.icon}</Icon>
              </IconButton>
            </Grid>
          ))}
        </Grid>
    </nav>
  );
};

export const Toolbar = withRouter(ToolbarBase);
