'use client';

import Image from 'next/image';

interface WeatherIconProps {
  iconCode: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  animated?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 32,
  md: 48,
  lg: 80,
  xl: 128,
  '2xl': 160,
};

const GIF_MAPPING: Record<string, string> = {
  // Clouds
  '02d': 'cloudy.gif',       
  '02n': 'cloudy-night.gif', 
  '03d': 'clouds.gif',       
  '03n': 'clouds.gif',
  '04d': 'clouds.gif',      
  '04n': 'clouds.gif',
  
  // Rain
  '09d': 'drizzle.gif',      
  '09n': 'drizzle.gif',
  '10d': 'rain.gif',         
  '10n': 'rain.gif',
  
  // Thunderstorm
  '11d': 'storm.gif',
  '11n': 'storm.gif',
  
  // Snow
  '13d': 'hailstones.gif',
  '13n': 'hailstones.gif',
  
  // Mist/Fog
  '50d': 'foggy.gif',
  '50n': 'foggy.gif',
};

export default function WeatherIcon({ iconCode, size = 'md', animated = true, className = '' }: WeatherIconProps) {
  const gifName = GIF_MAPPING[iconCode];
  const pixelSize = sizeClasses[size];
  const src = gifName 
    ? `/icons/${gifName}` 
    : `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const imageClass = gifName
    ? "object-contain mix-blend-multiply dark:mix-blend-normal rounded-full"
    : "object-contain";

  const containerClass = gifName
    ? `relative inline-flex items-center justify-center ${className} dark:bg-white dark:rounded-2xl dark:shadow-md dark:p-1`
    : `relative inline-flex items-center justify-center ${className}`;

  return (
    <div 
      className={containerClass} 
      style={{ width: pixelSize, height: pixelSize }}
    >
      <Image
        src={src}
        alt={`Weather icon for ${iconCode}`}
        fill
        className={imageClass}
        unoptimized
      />
    </div>
  );
}
