import { Grid, Grow, Typography } from "@material-ui/core";
import * as React from "react";
import { BackButton } from "./BackButton";

interface IPageHeader {
  title: string;
}

export const PageHeader = ({ title }: IPageHeader) => (
  <Grow in={true}>
    <Grid container={true} spacing={16}>
      <Grid item={true}>
        <BackButton/>
      </Grid>
      <Grid item={true}>
        <Typography variant='h3'>{title}</Typography>
      </Grid>
    </Grid>
  </Grow>
);