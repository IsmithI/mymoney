import { Icon, IconButton, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import styles from './styles';

interface IProps extends WithStyles<typeof styles>, RouteChildrenProps {

}

export const BackButton = withStyles(styles)(withRouter(({ history, classes }: IProps) => {
  const goBack = () => history.goBack();
  return (
    <IconButton onClick={goBack}>
      <Icon fontSize='large' className={classes.icon}>
        arrow_back
      </Icon>
    </IconButton>
  );
}));
