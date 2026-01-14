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
  it('renders main weather information correctly', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    
    expect(screen.getByRole('heading', { level: 1, name: /Tokyo/i })).toBeInTheDocument();

    expect(screen.getByText('22')).toBeInTheDocument();
    
    expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
  });

  it('renders weather details', () => {
    render(<CurrentWeather data={mockWeatherData} />);
    
    expect(screen.getByText(/Terasa seperti 24°/)).toBeInTheDocument();
    
    expect(screen.getByText(/Kelembapan/i)).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    
    expect(screen.getByText(/Angin/i)).toBeInTheDocument();
    expect(screen.getByText(/15/)).toBeInTheDocument();
    
    expect(screen.getByText('Clouds')).toBeInTheDocument();
  });
});
