import { Card, CardContent, Collapse, Grid, Typography } from '@material-ui/core';
import { WeatherIcon } from 'components';
import React from 'react';
import { RouteChildrenProps, withRouter } from 'react-router';
import { IWeatherData } from 'stores/weatherStore';

interface IProps extends RouteChildrenProps {
  data: IWeatherData;
}

export const WeatherDetails = withRouter(({ data, history }: IProps) => {
  const nextPage = () => history.push('weather');

  return (
    <Card>
      <CardContent onClick={nextPage}>
        <Collapse in={!!data}>
          {data && (
            <Grid container spacing={16} wrap='nowrap'>
              <Grid item>
                <Typography variant='h3'>
                  <WeatherIcon value={data.icon} isDay={data.isDay}/>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1'>{data.condition}</Typography>
                <Typography variant='title'>{data.temperature}&deg;C</Typography>
              </Grid>
            </Grid>
          )}
        </Collapse>
      </CardContent>
    </Card>
  );
});
