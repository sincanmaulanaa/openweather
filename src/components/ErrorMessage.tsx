import React from 'react';
import { WeatherError } from '@/types';

interface ErrorMessageProps {
  error: WeatherError;
  onRetry?: () => void;
}

const errorMessages: Record<WeatherError['type'], { title: string; icon: React.ReactNode }> = {
  NOT_FOUND: {
    title: 'Kota Tidak Ditemukan',
    icon: (
      <svg className="w-24 h-24 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  },
  API_ERROR: {
    title: 'Kesalahan Layanan',
    icon: (
      <svg className="w-24 h-24 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
  },
  NETWORK_ERROR: {
    title: 'Kesalahan Koneksi',
    icon: (
      <svg className="w-24 h-24 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
      </svg>
    ),
  },
};

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const { title, icon } = errorMessages[error.type] || errorMessages.API_ERROR;

  return (
    <div className="flat-card p-10 sm:p-12 text-center animate-fade-in max-w-lg mx-auto">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-slate-50 dark:bg-slate-800/50">
          {icon}
        </div>
      </div>
      
      <h3 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground tracking-tight">{title}</h3>
      <p className="text-lg text-text-muted mb-8 max-w-xs mx-auto leading-relaxed">{error.message}</p>
      
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-8 py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-lg
                     font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}
