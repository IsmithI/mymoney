import { CircularProgress, Grid } from "@material-ui/core";
import * as React from "react";

export const Login = () => (
  <Grid container={true} justify="center">
    <Grid item={true}>
      <CircularProgress variant="indeterminate"/>
    </Grid>
  </Grid>
);
