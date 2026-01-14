// Weather API Types

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherData {
  city: string;
  country: string;
  state?: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  condition: string;
  sunrise: number;
  sunset: number;
  timestamp: number;
}

export interface HourlyForecastItem {
  time: number;
  temperature: number;
  icon: string;
  description: string;
}

export interface DailyForecastItem {
  date: number;
  dayName: string;
  tempHigh: number;
  tempLow: number;
  icon: string;
  description: string;
}

export interface WeatherData {
  current: CurrentWeatherData;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}

// OpenWeatherMap Geocoding API Response
export interface OWMGeocodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface OWMOneCallResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
  };
  hourly: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
    pop: number;
  }>;
  daily: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
    clouds: number;
    pop: number;
    uvi: number;
  }>;
}

export interface CachedWeatherData {
  data: WeatherData;
  timestamp: number;
  city: string;
}

export type WeatherError = {
  type: 'NOT_FOUND' | 'API_ERROR' | 'NETWORK_ERROR';
  message: string;
};
