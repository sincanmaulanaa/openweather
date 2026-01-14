import { DailyForecastItem } from '@/types';
import WeatherIcon from './WeatherIcon';

interface WeeklyForecastProps {
  data: DailyForecastItem[];
}

export default function WeeklyForecast({ data }: WeeklyForecastProps) {
  if (!data.length) return null;

  return (
    <div className="flat-card p-6 animate-fade-in bg-card-bg rounded-2xl">
      <h2 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
         <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Prakiraan 7 Hari
      </h2>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.date}
            className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700"
          >
            <div className="w-24 font-medium text-foreground">
              {index === 0 ? 'Hari Ini' : item.dayName}
            </div>
            
            <div className="flex items-center gap-3 flex-1 justify-center">
              <WeatherIcon 
                iconCode={item.icon} 
                size="sm" 
                animated={false} 
              />
              <span className="text-sm text-text-muted capitalize hidden sm:block w-24 md:w-full truncate">
                {item.description}
              </span>
            </div>

            <div className="flex items-center gap-4 w-28 justify-end">
              <span className="font-bold text-foreground">{item.tempHigh}°</span>
              <span className="text-text-muted">{item.tempLow}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
