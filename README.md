# Weather App

Real-time weather application built with Next.js 16, React 19, and Tailwind CSS v4.

## Features

- **Real-time Weather Data**: Fetches accurate weather information using the OpenWeatherMap API (One Call API 3.0).
- **Search Capability**: Search for any city worldwide.
- **Geolocation Support**: Automatically detect your current location.
- **Animated Icons**: Premium animated GIFs for weather conditions with fallback support.
- **Dark Mode**: Fully supported dark/light theme toggling with persistent preference.
- **Responsive Design**: Mobile-first layout that works on all devices.
- **Localized**: Full Indonesian language support for weather descriptions.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS v4
- **Testing**: Vitest + React Testing Library
- **Font**: Poppins (via next/font)
- **Data Source**: OpenWeatherMap API

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Configuration

Create a .env file in the root directory with the following variables:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
NEXT_PUBLIC_GEO_BASE_URL=http://api.openweathermap.org/geo/1.0
NEXT_PUBLIC_DATA_BASE_URL=https://api.openweathermap.org/data/3.0
```

### Running Locally

Start the development server:

```bash
pnpm dev
```

Open http://localhost:3000 in your browser.

## Testing

This project uses Vitest for unit and integration testing.

Run all tests:
```bash
pnpm test
```

Run tests in UI mode:
```bash
pnpm test:ui
```

## Project Structure

- src/app: App Router pages and layouts
- src/components: Reusable UI components
- src/lib: Utility functions and API services
- src/types.ts: TypeScript type definitions
- public/icons: Weather animation assets

## License

Private project.
