'use client';

import { useState, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSelect: (lat: number, lon: number) => void;
  isLoading?: boolean;
}

export default function SearchBar({ onSearch, onLocationSelect, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      onSearch(trimmedQuery);
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocating(false);
          onLocationSelect(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setIsLocating(false);
          console.error('Geolocation error:', error);
          alert('Tidak dapat mengambil lokasi Anda. Silakan periksa pengaturan browser Anda.');
        }
      );
    } else {
      alert('Geolokasi tidak didukung oleh browser Anda.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari nama kota..."
            disabled={isLoading || isLocating}
            className="w-full px-5 py-4 pl-5 pr-14 bg-card-bg border border-card-border rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={isLoading || isLocating || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary hover:bg-primary-hover text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Cari"
          >
            {isLoading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleLocationClick}
           disabled={isLoading || isLocating}
           className="p-4 rounded-xl bg-card-bg border border-card-border text-text-muted hover:text-primary hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
           title="Gunakan lokasi saya saat ini"
        >
          {isLocating ? (
             <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
             </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}
