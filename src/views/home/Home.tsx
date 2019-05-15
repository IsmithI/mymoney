import { Grid } from "@material-ui/core";
import { Toolbar } from "components";
import { AppGroup, DigitalClock, TodoList, TransactionsWidget, WeatherWidget } from "components/widgets";
import * as React from "react";

export const Home = () => {
  return (
    <>
      <Grid container spacing={32}>
        <Grid item xs={12} sm={8} lg={4}>
          <TodoList/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid container spacing={32} justify='center' alignItems='center'>
            <Grid item sm={12} lg={6}>
              <WeatherWidget/>
            </Grid>
            <Grid item>
              <DigitalClock/>
            </Grid>
            <Grid item>
              <AppGroup/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} lg={4}>
          <TransactionsWidget/>
        </Grid>
      </Grid>
      <Toolbar/>
    </>
  );
};