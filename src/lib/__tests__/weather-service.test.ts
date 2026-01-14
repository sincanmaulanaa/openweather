import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchWeatherData, fetchWeatherByCoords, kelvinToCelsius } from '../weather-service';
import { OWMGeocodingResponse, OWMOneCallResponse } from '@/types';

global.fetch = vi.fn();

describe('kelvinToCelsius', () => {
  it('converts 273.15K to 0°C', () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
  });
});

describe('fetchWeatherData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY = 'mock-api-key';
  });

  const mockGeoResponse: OWMGeocodingResponse[] = [{
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB'
  }];

  const mockOneCallResponse: OWMOneCallResponse = {
    lat: 51.5074,
    lon: -0.1278,
    timezone: 'Europe/London',
    timezone_offset: 0,
    current: {
      dt: 1600000000,
      sunrise: 1600060000,
      sunset: 1600100000,
      temp: 20,
      feels_like: 20,
      pressure: 1013,
      humidity: 50,
      dew_point: 10,
      uvi: 5,
      clouds: 20,
      visibility: 10000,
      wind_speed: 5,
      wind_deg: 200,
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }]
    },
    hourly: Array(24).fill({
      dt: 1600003600,
      temp: 17,
      weather: [{ id: 800, main: 'Clear', description: 'clear', icon: '01d' }]
    }),
    daily: Array(7).fill({
      dt: 1600000000,
      temp: { min: 15, max: 25 },
      weather: [{ id: 800, main: 'Clear', description: 'sunny', icon: '01d' }]
    })
  } as OWMOneCallResponse;

  it('fetches coordinates then weather data successfully', async () => {
    (fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockOneCallResponse,
      });

    const result = await fetchWeatherData('London');

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/geo/1.0/direct?q=London'));
    expect(fetch).toHaveBeenNthCalledWith(2, expect.stringContaining('/data/3.0/onecall?lat=51.5074&lon=-0.1278'));

    expect(result.current.city).toBe('London');
    expect(result.current.temperature).toBe(20);
    expect(result.current.condition).toBe('Clouds');
    expect(result.hourly).toHaveLength(24);
    expect(result.daily).toHaveLength(7);
  });

  it('throws NOT_FOUND error when city not found', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    await expect(fetchWeatherData('NonExistentCity')).rejects.toEqual({
      type: 'NOT_FOUND',
      message: 'Kota "NonExistentCity" tidak ditemukan',
    });
  });

  it('throws API_ERROR when API key is invalid', async () => {
    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockGeoResponse,
    });
    
    (fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ message: 'Invalid API key' }),
    });

    await expect(fetchWeatherData('London')).rejects.toEqual({
      type: 'API_ERROR',
      message: 'Kunci API tidak valid atau langganan tidak aktif',
    });
  });
});

describe('fetchWeatherByCoords', () => {
    beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockGeoResponse: OWMGeocodingResponse[] = [{
    name: 'London',
    lat: 51.5074,
    lon: -0.1278,
    country: 'GB'
  }];

  const mockOneCallResponse: OWMOneCallResponse = {
    lat: 51.5074,
    lon: -0.1278,
    timezone: 'Europe/London',
    timezone_offset: 0,
    current: {
      dt: 1600000000,
      sunrise: 1600060000,
      sunset: 1600100000,
      temp: 20,
      feels_like: 20,
      pressure: 1013,
      humidity: 50,
      dew_point: 10,
      uvi: 5,
      clouds: 20,
      visibility: 10000,
      wind_speed: 5,
      wind_deg: 200,
      weather: [{ id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' }]
    },
    hourly: Array(24).fill({
      dt: 1600003600,
      temp: 17,
      weather: [{ id: 800, main: 'Clear', description: 'clear', icon: '01d' }]
    }),
    daily: Array(7).fill({
      dt: 1600000000,
      temp: { min: 15, max: 25 },
      weather: [{ id: 800, main: 'Clear', description: 'sunny', icon: '01d' }]
    })
  } as OWMOneCallResponse;

  it('fetches city name (reverse geo) then weather data successfully', async () => {
    (fetch as any)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockOneCallResponse,
      });

    const result = await fetchWeatherByCoords(51.5074, -0.1278);

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('/geo/1.0/reverse?lat=51.5074&lon=-0.1278'));
    expect(fetch).toHaveBeenNthCalledWith(2, expect.stringContaining('/data/3.0/onecall?lat=51.5074&lon=-0.1278'));

    expect(result.current.city).toBe('London');
  });
});
