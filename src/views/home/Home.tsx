import React from "react";
import { Grid } from "@material-ui/core";
import { CategoriesWidget, TransactionsWidget } from "../../components/widgets";

export const Home = () => (
  <Grid container spacing={32}>
    <Grid item>
      <CategoriesWidget />
    </Grid>
    <Grid item xs={6}>
      <TransactionsWidget />
    </Grid>
  </Grid>
);
