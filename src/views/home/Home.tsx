import { Grid } from "@material-ui/core";
import { Toolbar } from "components";
import { AppGroup, DigitalClock, TodoList, TransactionsWidget, WeatherWidget } from "components/widgets";
import * as React from "react";

export const Home = () => {
  return (
    <>
        <Grid container={true} spacing={32}>
          <Grid item={true} xs={12} sm={8} lg={4}>
            <TodoList/>
          </Grid>
          <Grid item={true} xs={12} sm={4}>
            <Grid container={true} spacing={32} justify='center'>
              <Grid item={true} sm={12} lg={6}>
                <WeatherWidget/>
              </Grid>
              <Grid item={true} xs={8} sm={true} lg={6}>
                <DigitalClock/>
              </Grid>
              <Grid item={true} xs={12}>
                <AppGroup/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item={true} xs={12} sm={8} lg={4}>
            <TransactionsWidget/>
          </Grid>
        </Grid>
      <Toolbar/>
    </>
  );
};