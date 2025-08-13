import { NextResponse, NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Force apex domain
  if (url.hostname === 'www.mahmoudhanadi.com') {
    url.hostname = 'mahmoudhanadi.com';
    return NextResponse.redirect(url, 308);
  }

  // Force HTTPS in production (Vercel sets x-forwarded-proto)
  const proto = req.headers.get('x-forwarded-proto');
  if (proto && proto !== 'https') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};


