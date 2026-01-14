import { WeatherData, CachedWeatherData } from '@/types';

const CACHE_KEY = 'weather_cache';
const CACHE_TTL = 30 * 60 * 1000;
const LAST_CITY_KEY = 'last_searched_city';

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Get cached weather data for a city
 */
export function getCachedWeather(city: string): WeatherData | null {
  if (!isBrowser()) return null;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const parsed: CachedWeatherData = JSON.parse(cached);

    if (parsed.city.toLowerCase() !== city.toLowerCase()) {
      return null;
    }

    if (Date.now() - parsed.timestamp > CACHE_TTL) {
      return null;
    }

    return parsed.data;
  } catch {
    return null;
  }
}

/**
 * Save weather data to cache
 */
export function setCachedWeather(city: string, data: WeatherData): void {
  if (!isBrowser()) return;

  try {
    const cacheData: CachedWeatherData = {
      city,
      data,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
  } catch {
    // Ignore storage errors (e.g., quota exceeded)
  }
}

/**
 * Clear the weather cache
 */
export function clearCache(): void {
  if (!isBrowser()) return;

  try {
    localStorage.removeItem(CACHE_KEY);
  } catch {
    // Ignore errors
  }
}

/**
 * Get the last searched city
 */
export function getLastSearchedCity(): string | null {
  if (!isBrowser()) return null;

  try {
    return localStorage.getItem(LAST_CITY_KEY);
  } catch {
    return null;
  }
}

/**
 * Save the last searched city
 */
export function setLastSearchedCity(city: string): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem(LAST_CITY_KEY, city);
  } catch {
    // Ignore errors
  }
}

/**
 * Get dark mode preference
 */
export function getDarkModePreference(): boolean {
  if (!isBrowser()) return false;

  try {
    const saved = localStorage.getItem('dark_mode');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    return false;
  }
}

/**
 * Save dark mode preference
 */
export function setDarkModePreference(isDark: boolean): void {
  if (!isBrowser()) return;

  try {
    localStorage.setItem('dark_mode', JSON.stringify(isDark));
  } catch {
    // Ignore errors
  }
}
