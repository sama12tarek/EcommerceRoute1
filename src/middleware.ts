import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  const { pathname } = request.nextUrl;


  if (token) {
  
    if (pathname === '/login' || pathname === '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } 

  else {

    if (pathname === '/card'||pathname==='/checkout') {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/card', '/login', '/register','/checkout'],
};


