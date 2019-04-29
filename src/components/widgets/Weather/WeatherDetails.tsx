import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import React from "react";
import { RouteChildrenProps, withRouter } from "react-router";
import { IWeatherData } from "../../../stores/weatherStore";
import { WeatherIcon } from "../../WeatherIcon";

interface Props extends RouteChildrenProps {
	data: IWeatherData;
}

export const WeatherDetails = withRouter(({ data, history }: Props) => {
	const { icon, isDay, condition, temperature } = data;

	return (
		<Card>
			<CardContent onClick={() => history.push("weather")}>
				<Grid container spacing={16} wrap='nowrap'>
					<Grid item>
						<Typography variant='h3'>
							<WeatherIcon value={icon} isDay={isDay} />
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='title'>{condition}</Typography>
						<Typography variant='subtitle1'>{temperature}&deg;C</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
});
