import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://v2.jokeapi.dev/joke/Programming?type=single', {
      headers: {
        accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to fetch joke' }, { status: 502 });
    }

    const data = (await res.json()) as { joke?: string };

    return NextResponse.json({ ok: true, joke: data.joke || 'No joke found.' });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
