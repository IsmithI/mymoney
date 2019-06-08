import { action, computed, observable } from 'mobx';
import { get } from 'utils/fetch';

const config = {
  endpoint: 'http://api.openweathermap.org/data/2.5',
  appId: '2cb43e94eb9b9cc38519474b5504f7f0'
};

export interface IWeatherData {
  temperature: number;
  condition: string;
  icon: string;
  isDay: boolean;
}

export interface IWeatherStore {
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
  @computed
  get weatherData() {
    const now = Math.round(new Date().getTime() / 1000);
    return (
      this.data && {
        temperature: Math.round(10 * (this.data.main.temp - 273)) / 10,
        condition: this.data.weather[0].description,
        icon: this.data.weather[0].main,
        isDay: now > this.data.sys.sunrise && now < this.data.sys.sunset
      }
    );
  }

  @computed
  get forecastData() {
    return (
      this.forecast &&
      this.forecast.list
        .filter(({  }: any, i: number) => i % 8 === 0)
        .map((item: any) => ({
          date: new Date(item.dt * 1000),
          data: item.weather[0],
          temp: Math.round(10 * (item.main.temp - 273)) / 10
        }))
    );
  }

  @observable
  public data: any;

  @observable
  public forecast: any;

  @observable
  public error: string | false = false;

  @observable
  public loading = true;
  @observable
  protected geolocation: Position | null = null;

  public async position(): Promise<Position> {
    if (this.geolocation) {
      return new Promise(r => r(this.geolocation));
    }
    return this.getCurrentPosition();
  }

  @action
  public saveGeolocation = (geolocation: Position) => {
    this.geolocation = geolocation;
  }

  @action
  public saveError = (error: PositionError) => {
    this.error = error.message;
  }

  @action
  public saveWeatherData = (data: any) => {
    this.data = data;
  }

  @action
  public doneLoading = () => {
    this.loading = false;
  }

  public requestCurrentWeather = async () => {
    const {
      coords: { latitude, longitude }
    } = await this.position();

    const url = `${config.endpoint}/weather?lat=${latitude}&lon=${longitude}&APPID=${config.appId}`;

    return get(url)
      .then(this.saveWeatherData)
      .then(this.doneLoading);
  }

  public requestWeatherForecast = async () => {
    const {
      coords: { latitude, longitude }
    } = await this.position();

    const url = `${config.endpoint}/forecast?lat=${latitude}&lon=${longitude}&APPID=${config.appId}`;

    return get(url)
      .then(this.saveForecast)
      .then(this.doneLoading);
  }

  @action
  public saveForecast = (forecast: any) => {
    this.forecast = forecast;
  }

  private getCurrentPosition = (options = {}): Promise<Position> => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}

export const weatherStore = new WeatherStore();
