import { Card, CardContent, Grid, Grow, Typography } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import * as React from "react";
import { WeatherIcon } from "../../components/WeatherIcon";
import { IWeatherStore } from "../../stores/weatherStore";
import { getDayOfWeek } from "../../utils/date";
import "./Weather.scss";

interface IProps {
  weatherStore?: IWeatherStore;
}

@inject("weatherStore")
@observer
export class Weather extends React.Component<IProps> {
  public componentDidMount() {
    this.props.weatherStore.requestCurrentWeather();
    this.props.weatherStore.requestWeatherForecast();
  }

  public render() {
    const {
      weatherStore: { weatherData, forecastData }
    } = this.props;

    return (
      <Grow in={!!weatherData && !!forecastData}>
        <div className='weather__container'>
          {weatherData && forecastData && (
            <>
              <Grid container={true} alignItems='center'>
                <Grid item={true} xs={4}>
                  <Typography variant='h1'>
                    <WeatherIcon value={weatherData.icon} isDay={weatherData.isDay} />
                  </Typography>
                </Grid>
                <Grid item={true} xs={8}>
                  <Typography variant='h2' align='right'>
                    {weatherData.temperature} &deg; C
                  </Typography>
                </Grid>
              </Grid>
              <p className='weather__heading'>{weatherData.condition}</p>
              <Card>
                <CardContent>
                  <Grid container={true} spacing={16} justify='space-around'>
                    {forecastData.map((item, i) => (
                      <Grid item={true} key={i}>
                        <div className='weather__day'>
                          <div>
                            <Typography align='center' variant='subheading'>
                              {getDayOfWeek(item.date.getDay())}
                            </Typography>
                            <br />
                            <Typography variant='h4' align='center'>
                              <WeatherIcon value={item.data.main.toLowerCase()} />
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
            </>
          )}
        </div>
      </Grow>
    );
  }
}
