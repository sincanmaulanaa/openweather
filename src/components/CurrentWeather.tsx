import { CurrentWeatherData } from '@/types';
import WeatherIcon from './WeatherIcon';

interface CurrentWeatherProps {
  data: CurrentWeatherData;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  return (
    <div className="flat-card p-6 sm:p-8 animate-fade-in h-full bg-card-bg rounded-2xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-1 mb-3 text-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium text-sm">Lokasi Sekarang</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground leading-tight">
            {data.city}{data.state ? `, ${data.state}` : ''}
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-6 mb-8 text-center">
        <div className="relative mb-4">
           <WeatherIcon iconCode={data.icon} size="2xl" />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-center">
            <span className="text-7xl sm:text-8xl font-bold text-foreground tracking-tighter">
              {data.temperature}
            </span>
            <span className="text-3xl sm:text-4xl font-light text-text-muted mt-2 sm:mt-4">°</span>
          </div>
          <p className="text-xl sm:text-2xl font-medium capitalize text-foreground">
            {data.description}
          </p>
          <div className="inline-block mt-2">
            <p className="text-sm text-text-muted bg-slate-100 dark:bg-slate-700/50 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
              Terasa seperti {data.feelsLike}°
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-card-border">
        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
          <div className="text-primary mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 12c0 4.5-3.5 8-7.5 8s-7.5-3.5-7.5-8c0-4 7.5-12 7.5-12s7.5 8 7.5 12z" />
            </svg>
          </div>
          <span className="text-xs text-text-muted font-medium mb-0.5 uppercase tracking-wide">Kelembapan</span>
          <p className="text-base font-bold text-foreground">{data.humidity}%</p>
        </div>

        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
           <div className="text-primary mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <span className="text-xs text-text-muted font-medium mb-0.5 uppercase tracking-wide">Angin</span>
          <p className="text-base font-bold text-foreground">{data.windSpeed} <span className="text-xs font-normal text-text-muted lowercase">km/j</span></p>
        </div>

        <div className="flex flex-col items-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
           <div className="text-primary mb-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M12.728 0l-.707.707M6.343 17.657l-.707.707" />
            </svg>
          </div>
          <span className="text-xs text-text-muted font-medium mb-0.5 uppercase tracking-wide">Kondisi</span>
          <p className="text-base font-bold text-foreground truncate max-w-full px-1">{data.condition}</p>
        </div>
      </div>
    </div>
  );
}
