import { Grid, Grow, Typography } from "@material-ui/core";
import * as React from "react";
import { BackButton } from "./BackButton";

interface IPageHeader {
  title: string;
}

export const PageHeader = ({ title }: IPageHeader) => (
  <Grow in={true}>
    <Grid container spacing={16} alignItems='center' wrap='nowrap'>
      <Grid item>
        <BackButton/>
      </Grid>
      <Grid item>
        <Typography variant='h3' color='secondary'>{title}</Typography>
      </Grid>
    </Grid>
  </Grow>
);