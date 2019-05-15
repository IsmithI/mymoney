import { Card, CardContent, Grid, Grow, Typography } from "@material-ui/core";
import { HeadlineLoader, PageHeader, WeatherIcon } from "components";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { IWeatherStore } from "stores/weatherStore";
import { getDayOfWeek } from "utils/date";
import "./Weather.scss";

interface IProps {
  weatherStore?: IWeatherStore;
}

@inject("weatherStore")
@observer
export class Weather extends React.Component<IProps> {

  state = {
    loaded: false
  };

  public componentDidMount() {
    Promise.all([
      this.props.weatherStore.requestCurrentWeather(),
      this.props.weatherStore.requestWeatherForecast()
    ]).then(() => {
      this.setState({ loaded: true });
    });
  }

  public render() {
    const { loaded } = this.state;
    const {
      weatherStore: { weatherData, forecastData, error }
    } = this.props;

    return (
      <>
        <Grow in={true}>
          <PageHeader title='Weather'/>
        </Grow>
        <br/>
        {loaded ? error ? (
          <Typography variant='title'>
            {error.toString()}
          </Typography>
        ) : (
          <>
            <Grow in>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Typography variant='h1'>
                    <WeatherIcon value={weatherData.icon} isDay={weatherData.isDay}/>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant='h2' align='right'>
                    {weatherData.temperature} &deg; C
                  </Typography>
                </Grid>
              </Grid>
            </Grow>
            <Grow in={true}>
              <p className='weather__heading'>{weatherData.condition}</p>
            </Grow>
            <Grow in={true}>
              <Card>
                <CardContent>
                  <Grid container spacing={16} justify='space-around'>
                    {forecastData.map((item, i) => (
                      <Grid item key={i}>
                        <div className='weather__day'>
                          <div>
                            <Typography align='center' variant='subheading'>
                              {getDayOfWeek(item.date.getDay())}
                            </Typography>
                            <br/>
                            <Typography variant='h4' align='center'>
                              <WeatherIcon value={item.data.main.toLowerCase()}/>
                            </Typography>
                            <Typography align='center'>{item.data.description}</Typography>
                          </div>
                          <div className='weather__day_title'>
                            <Typography variant='title' align='center'>
                              {item.temp} &deg; C
                            </Typography>
                          </div>
                        </div>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Grow>
          </>
        ) : (
          <HeadlineLoader/>
        )}
      </>
    );
  }
}
