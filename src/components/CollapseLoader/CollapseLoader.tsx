import { CircularProgress, Collapse, Grid } from "@material-ui/core";
import * as React from "react";
import { IHasChildren } from "../../interfaces";

interface IProps extends IHasChildren {
  loading: boolean;
}

export const CollapseLoader = ({ loading, children }: IProps) => (
  <>
    <Collapse in={!loading}>{children}</Collapse>
    {loading && (
      <Grid container={true} justify="center" alignItems="center">
        <Grid item={true}>
          <CircularProgress/>
        </Grid>
      </Grid>
    )}
  </>
);
