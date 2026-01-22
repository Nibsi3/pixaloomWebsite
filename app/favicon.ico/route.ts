import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/icon.png', 'http://localhost'), 308);
}
