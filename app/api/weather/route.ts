import { NextResponse } from 'next/server';

const GEORGE_ZA = { lat: -33.963, lon: 22.461 };

export async function GET() {
  try {
    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(GEORGE_ZA.lat));
    url.searchParams.set('longitude', String(GEORGE_ZA.lon));
    url.searchParams.set('current', 'temperature_2m,wind_speed_10m,weather_code');

    const res = await fetch(url.toString(), { cache: 'no-store' });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to fetch weather' }, { status: 502 });
    }

    const data = (await res.json()) as {
      current?: {
        temperature_2m?: number;
        wind_speed_10m?: number;
        weather_code?: number;
      };
    };

    const current = data.current || {};

    return NextResponse.json({
      ok: true,
      city: 'George, Western Cape',
      temperatureC: current.temperature_2m ?? null,
      windKmh: current.wind_speed_10m ?? null,
      weatherCode: current.weather_code ?? null,
    });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
