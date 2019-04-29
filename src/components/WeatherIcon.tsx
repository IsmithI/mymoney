import React from "react";
import { FaIcon } from "./FaIcon";
interface IWeatherIcon {
	value: string;
	isDay?: boolean;
}
export const WeatherIcon = ({ value, isDay = true }: IWeatherIcon) => {
	let icon = "";
	switch (value.toLowerCase()) {
		case "rain":
			icon = "cloud-rain";
			break;
		case "clear":
			icon = isDay ? "sun" : "moon";
			break;
		case "clouds":
			icon = "cloud";
			break;
	}
	return <FaIcon icon={icon} />;
};
