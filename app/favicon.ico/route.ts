import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.redirect(new URL('/pixaloomLogo.png', 'http://localhost'), 308);
}
