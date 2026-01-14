'use client';

import { useState, useEffect } from 'react';

const LOADING_MESSAGES = [
  "Sedang membujuk awan untuk pergi...",
  "Menghitung rintik hujan satu per satu...",
  "Menghubungi pawang hujan...",
  "Mencari matahari yang bersembunyi...",
  "Mengukur kecepatan angin dengan jari basah...",
  "Sedang bertanya pada rumput yang bergoyang...",
  "Menyiapkan ramalan cuaca terakurat...",
  "Menerjemahkan bahasa awan...",
];

export default function LoadingSpinner() {
  const [message, setMessage] = useState("Memuat data cuaca...");

  useEffect(() => {
    const randomMessage = LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)];
    setMessage(randomMessage);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 animate-fade-in">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 dark:border-primary/10" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-10 h-10 text-primary/60 animate-pulse-soft" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
          </svg>
        </div>
      </div>
      
      <p className="text-text-muted font-medium text-lg animate-pulse">
        {message}
      </p>
    </div>
  );
}
