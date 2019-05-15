import { CircularProgress, Collapse, Grid } from '@material-ui/core';
import { IHasChildren } from 'interfaces';
import * as React from 'react';

interface IProps extends IHasChildren {
  loading: boolean;
}

export const CollapseLoader = ({ loading, children }: IProps) => (
  <>
    <Collapse in={!loading}>{children}</Collapse>
    {loading && (
      <Grid container justify='center' alignItems='center'>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    )}
  </>
);
