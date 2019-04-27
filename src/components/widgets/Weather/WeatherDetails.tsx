import React from "react";
import { Typography, Grid, CardContent, Card } from "@material-ui/core";
import { FaIcon } from "../../FaIcon";

export const WeatherDetails = ({ data }: any) => {
	const temperature = Math.round(10 * (data.main.temp - 273)) / 10;
	const condition = data.weather[0].description;
	const icon = data.weather[0].main;
	const isDay = new Date().getTime() > data.sys.sunrise && new Date().getTime() < data.sys.sunset;

	return (
		<Card>
			<CardContent>
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
};

interface IWeatherIcon {
	value: string;
	isDay?: boolean;
}

const WeatherIcon = ({ value, isDay = true }: IWeatherIcon) => {
	let icon = "";
	switch (value.toLowerCase()) {
		case "rain":
			icon = "cloud-rain";
			break;
		case "clear":
			icon = isDay ? "sun" : "moon";
			break;
	}

	return <FaIcon icon={icon} />;
};
