// app/middleware.js

// app/middleware.js

// File: /pages/_middleware.js (or /pages/account/_middleware.js for specific route)

import { NextResponse } from 'next/server';

export function middleware(request) {
  // Check for user authentication (replace with your actual logic)
  const isAuthenticated = true; // Replace with your authentication logic

  // Check if the current path is '/account' and the user is not authenticated
  if (request.nextUrl.pathname === '/account' && !isAuthenticated) {
    // Redirect to home page if not authenticated
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If authenticated or not the '/account' route, proceed as normal
  return NextResponse.next();
}



// app/middleware.js

// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';  // JWT library for token verification

// export function middleware(request) {
//   const token = request.cookies.get('authToken'); // Access JWT token from cookies

//   if (!token) {
//     // If there is no token, redirect to login page
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     // Verify JWT (use your secret key or public key to verify the token)
//     jwt.verify(token, 'your-secret-key');
//   } catch (error) {
//     // If token verification fails, redirect to login
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // If the token is valid, proceed with the request
//   return NextResponse.next();
// }

