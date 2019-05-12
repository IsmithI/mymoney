import { Card, CardContent, Grid, Grow, Typography } from '@material-ui/core';
import { WeatherIcon } from 'components';
import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { IWeatherData } from 'stores/weatherStore';

interface IProps extends RouteChildrenProps {
  data: IWeatherData;
}

export const WeatherDetails = withRouter(({ data, history }: IProps) => {
  const { icon, isDay, condition, temperature } = data;
  const nextPage = () => history.push('weather');

  return (
    <Grow in={true}>
      <Card>
        <CardContent onClick={nextPage}>
          <Grid container={true} spacing={16} wrap='nowrap'>
            <Grid item={true}>
              <Typography variant='h3'>
                <WeatherIcon value={icon} isDay={isDay} />
              </Typography>
            </Grid>
            <Grid item={true}>
              <Typography variant='subtitle1'>{condition}</Typography>
              <Typography variant='title'>{temperature}&deg;C</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grow>
  );
});
