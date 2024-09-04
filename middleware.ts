import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // Define paths that should not be intercepted by the middleware
    const publicPaths = [
      '/auth', 
      // '/admin', 
      // '/applicant', 
      '/auth/login', 
      '/auth/notify-me', 
      '/public', 
      '/favicon.ico', 
      '/_next'
    ];

    // If the path is one of the public paths, allow the request to continue
    if (publicPaths.some(path => pathname.startsWith(path))) {
      return NextResponse.next();
    }

    // If there's a token and the path is the root path, clear the token and redirect to login
    // if (pathname === '/') {
    //   if (token) {
    //     // Destroy existing token (you might need to implement or adapt this functionality)
    //     // Clear session or cookie if needed
    //     return NextResponse.redirect(new URL('/auth/login', req.url).toString());
    //   }
    //   return NextResponse.next();
    // }

    if (!token) {
      // Redirect unauthenticated users trying to access protected routes
      if (pathname.startsWith('/admin') || pathname.startsWith('/applicant')) {
        return NextResponse.redirect(new URL('/auth/login', req.url).toString());
      }
      return NextResponse.next();
    }

    const userRole = token.role; // Assuming the role is stored in the JWT token
    const resetPassword = token.resetPassword; // Assuming resetPassword status is stored in the JWT token
    const userEmail = token.email;

    // if (userRole === 'applicant') {
    //   if (!resetPassword) {
    //     // Redirect to notify-me page if the applicant has not reset their password
    //     const redirectUrl = new URL(`/auth/notify-me?email=${userEmail}&new=true`, req.url);
    //     return NextResponse.redirect(redirectUrl.toString());
    //   } else {
    //     // Redirect to the applicant dashboard if the password has been reset
    //     const redirectUrl = new URL('/applicant', req.url);
    //     return NextResponse.redirect(redirectUrl.toString());
    //   }
    // }

    // if (userRole === 'admin') {
    //   // Redirect to the admin dashboard if the user is an admin
    //   const redirectUrl = new URL('/admin', req.url);
    //   return NextResponse.redirect(redirectUrl.toString());
    // }

    // Continue to the next middleware or the requested page if no conditions are met
    return NextResponse.next();
  } catch (error) {
    console.error('JWT Decryption Error:', error);
    // Redirect to login on error
    return NextResponse.redirect(new URL('/auth/login', req.url).toString());
  }
}
