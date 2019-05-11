import { observable, action, computed } from "mobx";
import { get } from "../utils/fetch";

const config = {
	endpoint: "http://api.openweathermap.org/data/2.5",
	appId: "2cb43e94eb9b9cc38519474b5504f7f0"
};

export interface IWeatherData {
	temperature: number;
	condition: string;
	icon: string;
	isDay: boolean;
}

export interface IWeatherStore {
	geolocation: Position | null;
	data: any;
	forecast: any;
	error: string | false;
	loading: boolean;
	doneLoading: () => void;
	weatherData: IWeatherData;
	forecastData: any[];
	requestCurrentWeather: () => Promise<any>;
	requestWeatherForecast: () => Promise<any>;
}

class WeatherStore implements IWeatherStore {
	@observable
	geolocation: Position | null = null;

	@observable
	data: any;

	@observable
	forecast: any;

	@observable
	error: string | false = false;

	@observable
	loading = true;

	constructor() {
		if (!navigator.geolocation) {
			this.error = "Your browser doesn't support geolocation";
		} else {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.saveGeolocation(position);
				},
				error => {
					this.saveError(error);
					this.doneLoading();
				}
			);
		}
	}

	@action
	saveGeolocation = (geolocation: Position) => {
		this.geolocation = geolocation;
	};

	@action
	saveError = (error: PositionError) => {
		this.error = error.message;
	};

	@action
	saveWeatherData = (data: any) => {
		this.data = data;
	};

	@action
	doneLoading = () => {
		this.loading = false;
	};

	requestCurrentWeather = () => {
		const {
			coords: { latitude, longitude }
		} = this.position;

		const url = `${config.endpoint}/weather?lat=${latitude}&lon=${longitude}&APPID=${config.appId}`;

		return get(url)
			.then(this.saveWeatherData)
			.then(this.doneLoading);
	};

	requestWeatherForecast = () => {
		const {
			coords: { latitude, longitude }
		} = this.position;

		const url = `${config.endpoint}/forecast?lat=${latitude}&lon=${longitude}&APPID=${
			config.appId
		}`;

		return get(url)
			.then(this.saveForecast)
			.then(this.doneLoading);
	};

	@action
	saveForecast = (forecast: any) => {
		this.forecast = forecast;
	};

	@computed
	get weatherData() {
		const now = Math.round((new Date().getTime()) / 1000);
		return (
			this.data && {
				temperature: Math.round(10 * (this.data.main.temp - 273)) / 10,
				condition: this.data.weather[0].description,
				icon: this.data.weather[0].main,
				isDay:
					now > this.data.sys.sunrise &&
					now < this.data.sys.sunset
			}
		);
	}

	@computed
	get position() {
		return this.geolocation;
	}

	@computed
	get forecastData() {
		return (
			this.forecast &&
			this.forecast.list
				.filter((item, i) => i % 8 === 0)
				.map(item => ({
					date: new Date(item.dt * 1000),
					data: item.weather[0],
					temp: Math.round(10 * (item.main.temp - 273)) / 10
				}))
		);
	}
}

export const weatherStore = new WeatherStore();
