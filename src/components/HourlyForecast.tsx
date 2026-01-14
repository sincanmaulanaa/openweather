import { HourlyForecastItem } from '@/types';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  data: HourlyForecastItem[];
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
  });
}

export default function HourlyForecast({ data }: HourlyForecastProps) {
  if (!data.length) return null;

  return (
    <div className="flat-card p-6 animate-fade-in bg-card-bg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Prakiraan Per Jam
      </h2>
      
      <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar">
        {data.map((item, index) => (
          <div
            key={item.time}
            className={`
              flex-shrink-0 w-20 flex flex-col items-center p-3 rounded-xl border transition-colors
              ${index === 0 
                ? 'bg-primary text-white border-primary' 
                : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-foreground'
              }
            `}
          >
            <p className="text-sm font-medium mb-2">
              {index === 0 ? 'Now' : formatTime(item.time)}
            </p>
            <WeatherIcon 
              iconCode={item.icon} 
              size="sm" 
              animated={false}
              className="mb-2"
            />
            <p className="text-lg font-bold">
              {item.temperature}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
