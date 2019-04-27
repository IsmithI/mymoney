import { observable, action } from "mobx";
import { get } from "../utils/fetch";

const config = {
	endpoint: "http://api.openweathermap.org/data/2.5",
	appId: "2cb43e94eb9b9cc38519474b5504f7f0"
};

export interface IWeatherStore {
	geolocation: Position | null;
	data: any;
	error: string | false;
	loading: boolean;
	loadWeatherData: () => void;
	doneLoading: () => void;
}

class WeatherStore implements IWeatherStore {
	@observable
	geolocation: Position | null = null;

	@observable
	data: any;

	@observable
	error: string | false = false;

	@observable
	loading = true;

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

	loadWeatherData = () => {
		if (!navigator.geolocation) {
			this.error = "Your browser doesn't support geolocation";
			return;
		}

		if (!this.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					this.saveGeolocation(position);
					this.sendRequest(position);
				},
				error => {
					this.saveError(error);
					this.doneLoading();
				}
			);
		} else {
			this.sendRequest(this.geolocation);
		}
	};

	sendRequest = (geolocation: Position) => {
		const {
			coords: { latitude, longitude }
		} = geolocation;

		const url = `${config.endpoint}/weather?lat=${latitude}&lon=${longitude}&APPID=${config.appId}`;

		return get(url)
			.then(this.saveWeatherData)
			.then(this.doneLoading);
	};
}

export const weatherStore = new WeatherStore();
