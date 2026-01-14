import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CurrentWeather from '../../components/CurrentWeather';
import { CurrentWeatherData } from '@/types';

const mockWeatherData: CurrentWeatherData = {
  city: 'Tokyo',
  country: 'JP',
  temperature: 22,
  feelsLike: 24,
  humidity: 65,
  windSpeed: 15,
  description: 'partly cloudy',
  icon: '02d',
  condition: 'Clouds',
  sunrise: 1700000000,
  sunset: 1700040000,
  timestamp: 1700020000,
};

describe('CurrentWeather Component', () => {
  it('renders city name', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/Tokyo/)).toBeInTheDocument();
  });

  it('renders country code', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/JP/)).toBeInTheDocument();
  });

  it('renders temperature with degree symbol', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('°C')).toBeInTheDocument();
  });

  it('renders weather description', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
  });

  it('renders feels like temperature', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText(/Terasa seperti 24°C/)).toBeInTheDocument();
  });

  it('renders humidity', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText('65%')).toBeInTheDocument();
  });

  it('renders wind speed', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText('15 km/j')).toBeInTheDocument();
  });

  it('renders weather condition', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    expect(screen.getByText('Clouds')).toBeInTheDocument();
  });
});
