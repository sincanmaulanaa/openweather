import {
  CurrentWeatherData,
  HourlyForecastItem,
  DailyForecastItem,
  WeatherData,
  OWMOneCallResponse,
  OWMGeocodingResponse,
  WeatherError,
} from '@/types';

const GEO_BASE_URL = process.env.NEXT_PUBLIC_GEO_BASE_URL || 'https://api.openweathermap.org/geo/1.0';
const DATA_BASE_URL = process.env.NEXT_PUBLIC_DATA_BASE_URL || 'https://api.openweathermap.org/data/3.0';

/**
 * Parse temperature from Kelvin to Celsius
 */
export function kelvinToCelsius(kelvin: number): number {
  return Math.round(kelvin - 273.15);
}

/**
 * Get day name from timestamp
 */
function getDayName(timestamp: number): string {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const date = new Date(timestamp * 1000);
  return days[date.getDay()];
}

/**
 * Fetch coordinates for a city using Geocoding API
 */
async function fetchCoordinates(city: string): Promise<OWMGeocodingResponse> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw { type: 'API_ERROR', message: 'Kunci API tidak dikonfigurasi' } as WeatherError;
  }

  const response = await fetch(
    `${GEO_BASE_URL}/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`
  );

  if (!response.ok) {
    throw { type: 'API_ERROR', message: 'Gagal mencari koordinat kota' } as WeatherError;
  }

  const data: OWMGeocodingResponse[] = await response.json();

  if (!data || data.length === 0) {
    throw { type: 'NOT_FOUND', message: `Kota "${city}" tidak ditemukan` } as WeatherError;
  }

  return data[0];
}

/**
 * Parse weather data from One Call API response
 */
function parseWeatherData(data: OWMOneCallResponse, cityInfo: OWMGeocodingResponse): WeatherData {
  const current: CurrentWeatherData = {
    city: cityInfo.name,
    country: cityInfo.country,
    state: cityInfo.state,
    temperature: Math.round(data.current.temp),
    feelsLike: Math.round(data.current.feels_like),
    humidity: data.current.humidity,
    windSpeed: Math.round(data.current.wind_speed * 3.6),
    description: data.current.weather[0]?.description || 'Unknown',
    icon: data.current.weather[0]?.icon || '01d',
    condition: data.current.weather[0]?.main || 'Unknown',
    sunrise: data.current.sunrise,
    sunset: data.current.sunset,
    timestamp: data.current.dt,
  };

  const hourly: HourlyForecastItem[] = data.hourly.slice(0, 24).map((item) => ({
    time: item.dt,
    temperature: Math.round(item.temp),
    icon: item.weather[0]?.icon || '01d',
    description: item.weather[0]?.description || 'Unknown',
  }));

  const daily: DailyForecastItem[] = data.daily.slice(0, 7).map((item) => ({
    date: item.dt,
    dayName: getDayName(item.dt),
    tempHigh: Math.round(item.temp.max),
    tempLow: Math.round(item.temp.min),
    icon: item.weather[0]?.icon || '01d',
    description: item.weather[0]?.description || 'Unknown',
  }));

  return {
    current,
    hourly,
    daily,
  };
}

/**
 * Fetch city name from coordinates using Reverse Geocoding API
 */
async function fetchReverseGeocoding(lat: number, lon: number): Promise<OWMGeocodingResponse> {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw { type: 'API_ERROR', message: 'Kunci API tidak dikonfigurasi' } as WeatherError;
  }

  const response = await fetch(
    `${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`
  );

  if (!response.ok) {
    throw { type: 'API_ERROR', message: 'Gagal mengidentifikasi lokasi' } as WeatherError;
  }

  const data: OWMGeocodingResponse[] = await response.json();

  if (!data || data.length === 0) {
    throw { type: 'NOT_FOUND', message: 'Nama lokasi tidak ditemukan' } as WeatherError;
  }

  return data[0];
}

/**
 * Fetch all weather data for a city using One Call API 3.0
 */
export async function fetchWeatherData(city: string): Promise<WeatherData> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const coords = await fetchCoordinates(city);

    const response = await fetch(
      `${DATA_BASE_URL}/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,alerts&units=metric&lang=id&appid=${apiKey}`
    );

    if (!response.ok) {
      if (response.status === 401) {
          throw { type: 'API_ERROR', message: 'Kunci API tidak valid atau langganan tidak aktif' } as WeatherError;
      }
      throw { type: 'API_ERROR', message: 'Gagal mengambil data cuaca' } as WeatherError;
    }

    const data: OWMOneCallResponse = await response.json();
    return parseWeatherData(data, coords);

  } catch (error) {
    if ((error as WeatherError).type) {
      throw error;
    }
    console.error('Weather fetch error:', error);
    throw { type: 'NETWORK_ERROR', message: 'Masalah jaringan. Silakan periksa koneksi Anda.' } as WeatherError;
  }
}

/**
 * Fetch weather data by coordinates
 */
export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const cityInfo = await fetchReverseGeocoding(lat, lon);

    const response = await fetch(
      `${DATA_BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&lang=id&appid=${apiKey}`
    );

    if (!response.ok) {
       if (response.status === 401) {
          throw { type: 'API_ERROR', message: 'Kunci API tidak valid atau langganan tidak aktif' } as WeatherError;
      }
      throw { type: 'API_ERROR', message: 'Gagal mengambil data cuaca' } as WeatherError;
    }

    const data: OWMOneCallResponse = await response.json();
    return parseWeatherData(data, cityInfo);

  } catch (error) {
    if ((error as WeatherError).type) {
      throw error;
    }
    console.error('Weather fetch by coords error:', error);
    throw { type: 'NETWORK_ERROR', message: 'Masalah jaringan. Silakan periksa koneksi Anda.' } as WeatherError;
  }
}
