import * as React from "react";
import { IWeatherStore } from "../../../stores/weatherStore";
import { CardProps } from "@material-ui/core/Card";
import { inject, observer } from "mobx-react";
import { CircularProgress } from "@material-ui/core";
import { ErrorContainer } from "./ErrorContainerProps";
import { WeatherDetails } from "./WeatherDetails";

export interface IWeatherProps extends CardProps {
	weatherStore?: IWeatherStore;
}

@inject("weatherStore")
@observer
export class WeatherWidget extends React.Component<IWeatherProps> {
	componentDidMount() {
		this.props.weatherStore.loadWeatherData();
	}

	render() {
		const {
			weatherStore: { error, loading, data }
		} = this.props;

		return loading ? (
			<CircularProgress variant='indeterminate' />
		) : error ? (
			<ErrorContainer message={error} />
		) : (
			<WeatherDetails data={data} />
		);
	}
}
