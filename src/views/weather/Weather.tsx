import { inject, observer } from "mobx-react";
import * as React from "react";
import { IWeatherStore } from "../../stores/weatherStore";
import { Typography, Grow, Grid, Card, CardContent } from "@material-ui/core";
import "./Weather.scss";
import { WeatherIcon } from "../../components/WeatherIcon";

interface Props {
	weatherStore?: IWeatherStore;
}

@inject("weatherStore")
@observer
export class Weather extends React.Component<Props> {
	componentDidMount() {
		this.props.weatherStore.requestCurrentWeather();
		this.props.weatherStore.requestWeatherForecast();
	}

	render() {
		const {
			weatherStore: { weatherData, forecastData }
		} = this.props;

		console.log(forecastData);
		return (
			<Grow in={!!weatherData}>
				<div className='weather__container'>
					{weatherData && forecastData && (
						<>
							<Grid container alignItems='center'>
								<Grid item xs={4}>
									<Typography variant='h1'>
										<WeatherIcon value={weatherData.icon} isDay={weatherData.isDay} />
									</Typography>
								</Grid>
								<Grid item xs={8}>
									<Typography variant='h2' align='right'>
										{weatherData.temperature} &deg; C
									</Typography>
								</Grid>
							</Grid>
							<p className='weather__heading'>{weatherData.condition}</p>
							<Card>
								<CardContent>
									<Grid container spacing={16} justify='space-around'>
										{forecastData.map((item, i) => (
											<Grid item key={i}>
												<div className='weather__day'>
													<div>
														<Typography variant='h4' align='center'>
															<WeatherIcon value={item.data.main.toLowerCase()} />
														</Typography>
														<Typography align='center'>{item.data.description}</Typography>
													</div>
													<div>
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
