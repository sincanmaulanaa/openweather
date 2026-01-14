'use client';

import { useState, useEffect, useCallback } from 'react';
import { WeatherData, WeatherError } from '@/types';
import { fetchWeatherData, fetchWeatherByCoords } from '@/lib/weather-service';
import {
  getCachedWeather,
  setCachedWeather,
  getLastSearchedCity,
  setLastSearchedCity,
} from '@/lib/cache';

import SearchBar from '@/components/SearchBar';
import CurrentWeather from '@/components/CurrentWeather';
import HourlyForecast from '@/components/HourlyForecast';
import WeeklyForecast from '@/components/WeeklyForecast';
import DarkModeToggle from '@/components/DarkModeToggle';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<WeatherError | null>(null);
  const [currentCity, setCurrentCity] = useState<string>('');

  const fetchWeather = useCallback(async (city: string, useCache = true) => {
    setIsLoading(true);
    setError(null);

    if (useCache) {
      const cached = getCachedWeather(city);
      if (cached) {
        setWeatherData(cached);
        setCurrentCity(city);
        setIsLoading(false);
        return;
      }
    }

    try {
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      setCurrentCity(city);
      setCachedWeather(city, data);
      setLastSearchedCity(city);
    } catch (err) {
      setError(err as WeatherError);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchWeatherByLocation = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCoords(lat, lon);
      setWeatherData(data);
      setCurrentCity(data.current.city);
      setCachedWeather(data.current.city, data);
      setLastSearchedCity(data.current.city);
    } catch (err) {
      setError(err as WeatherError);
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const lastCity = getLastSearchedCity();
    if (lastCity) {
      fetchWeather(lastCity);
    }
  }, [fetchWeather]);

  const handleSearch = (city: string) => {
    fetchWeather(city, false);
  };

  const handleLocationSelect = (lat: number, lon: number) => {
    fetchWeatherByLocation(lat, lon);
  };

  const handleRetry = () => {
    if (currentCity) {
      fetchWeather(currentCity, false);
    }
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 max-w-7xl">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg bg-primary flex items-center justify-center shadow-none text-white">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
              Perkiraan Cuaca
            </h1>
          </div>
          <DarkModeToggle />
        </header>

        <div className="mb-8 max-w-2xl mx-auto lg:mx-0 lg:max-w-md">
          <SearchBar 
            onSearch={handleSearch} 
            onLocationSelect={handleLocationSelect}
            isLoading={isLoading} 
          />
        </div>

        <div className="mt-8">
          {isLoading && (
            <div className="flex justify-center py-20">
              <LoadingSpinner />
            </div>
          )}

          {error && !isLoading && (
            <div className="max-w-md mx-auto">
              <ErrorMessage error={error} onRetry={handleRetry} />
            </div>
          )}

          {weatherData && !isLoading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-4 space-y-6">
                <CurrentWeather data={weatherData.current} />
              </div>

              <div className="lg:col-span-8 space-y-6">
                <HourlyForecast data={weatherData.hourly} />
                <WeeklyForecast data={weatherData.daily} />
              </div>
            </div>
          )}

          {!weatherData && !isLoading && !error && (
            <div className="max-w-md mx-auto flat-card p-8 sm:p-12 text-center animate-fade-in">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-foreground">Cari Lokasi Anda</h2>
              <p className="text-sm sm:text-base text-text-muted max-w-sm mx-auto">
                Ketik nama kota atau gunakan lokasi saat ini untuk mendapatkan prakiraan cuaca terkini
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
