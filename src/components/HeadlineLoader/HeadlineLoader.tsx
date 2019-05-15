import { LinearProgress, withStyles, WithStyles } from "@material-ui/core";
import * as React from 'react';
import styles from "./styles";

interface IProps extends WithStyles<typeof styles> {
}

const Component = (props: IProps) => {

  return (
    <LinearProgress {...props} color='secondary' />
  );
};

export const HeadlineLoader = withStyles(styles)(Component);