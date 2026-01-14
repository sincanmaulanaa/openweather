import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../page';
import * as weatherService from '@/lib/weather-service';
import { WeatherData } from '@/types';

vi.mock('@/lib/weather-service', () => ({
  fetchWeatherData: vi.fn(),
  fetchWeatherByCoords: vi.fn(),
}));

const mockWeatherData: WeatherData = {
  current: {
    city: 'Jakarta',
    country: 'ID',
    temperature: 30,
    feelsLike: 34,
    humidity: 70,
    windSpeed: 10,
    description: 'hujan ringan',
    icon: '10d',
    condition: 'Rain',
    sunrise: 1600000000,
    sunset: 1600040000,
    timestamp: 1600020000,
  },
  hourly: [],
  daily: [],
};

describe('Weather App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search bar initially', () => {
    render(<Home />);
    
    expect(screen.getByPlaceholderText(/Cari nama kota/i)).toBeInTheDocument();
    expect(screen.getByText(/Cari Lokasi Anda/i)).toBeInTheDocument();
  });

  it('searches for a city and displays weather data', async () => {
    vi.mocked(weatherService.fetchWeatherData).mockResolvedValue(mockWeatherData);

    render(<Home />);

    const input = screen.getByPlaceholderText(/Cari nama kota/i);
    fireEvent.change(input, { target: { value: 'Jakarta' } });

    const searchButton = screen.getByLabelText(/Cari/i);
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('Jakarta')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('hujan ringan')).toBeInTheDocument();
    });

    expect(weatherService.fetchWeatherData).toHaveBeenCalledWith('Jakarta');
  });

  it('shows error message when city not found', async () => {
    vi.mocked(weatherService.fetchWeatherData).mockRejectedValue({
      type: 'NOT_FOUND',
      message: 'Kota "Unknown" tidak ditemukan',
    });

    render(<Home />);

    const input = screen.getByPlaceholderText(/Cari nama kota/i);
    fireEvent.change(input, { target: { value: 'Unknown' } });
    fireEvent.click(screen.getByLabelText(/Cari/i));

    await waitFor(() => {
      expect(screen.getByText(/Kota "Unknown" tidak ditemukan/i)).toBeInTheDocument();
    });
  });
});
