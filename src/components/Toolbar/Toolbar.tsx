import { Grid, Icon, IconButton } from '@material-ui/core';
import { items } from 'config/toolbar';
import { inject, observer } from "mobx-react";
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { ISettingsStore } from "../../stores/settingsStore";
import styles from './Toolbar.module.scss';

interface IProps extends RouteChildrenProps {
  settingsStore?: ISettingsStore;
}

const ToolbarBase = ({ history, settingsStore: { data } }: IProps) => {
  const nextPage = (path: string) => () => history.push(path);
  return data && data.toolbarEnabled ? (
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
  ) : <></>;
};

export const Toolbar = withRouter(inject('settingsStore')(observer(ToolbarBase)));
