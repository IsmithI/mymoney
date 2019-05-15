import { CircularProgress, Grid } from "@material-ui/core";
import * as React from "react";

export const Login = () => (
  <Grid container justify='center'>
    <Grid item>
      <CircularProgress variant='indeterminate' />
    </Grid>
  </Grid>
);
