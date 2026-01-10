import { NextResponse } from 'next/server';

const GITHUB_USER = 'Nibsi3';

type PushEvent = {
  type: 'PushEvent';
  repo?: { name?: string };
  created_at?: string;
  payload?: { commits?: { message?: string }[] };
};

type GithubEvent = PushEvent | { type?: string; repo?: { name?: string }; created_at?: string };

export async function GET() {
  try {
    const url = `https://api.github.com/users/${encodeURIComponent(GITHUB_USER)}/events/public?per_page=15`;
    const res = await fetch(url, {
      headers: {
        accept: 'application/vnd.github+json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      return NextResponse.json({ ok: false, error: 'Failed to fetch GitHub activity' }, { status: 502 });
    }

    const events = (await res.json()) as GithubEvent[];

    const pushes = events
      .filter((e) => e.type === 'PushEvent')
      .slice(0, 5) as PushEvent[];

    const items = pushes.map((p) => {
      const repo = p.repo?.name || 'unknown';
      const messages = (p.payload?.commits || [])
        .map((c) => (c.message || '').trim())
        .filter(Boolean)
        .slice(0, 3);
      return {
        repo,
        createdAt: p.created_at || null,
        messages,
      };
    });

    return NextResponse.json({ ok: true, user: GITHUB_USER, items });
  } catch {
    return NextResponse.json({ ok: false, error: 'Unexpected error' }, { status: 500 });
  }
}
