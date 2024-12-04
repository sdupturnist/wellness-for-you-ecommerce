import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'; // To access cookies in middleware

export function middleware(request) {
  // Mocking authentication logic, replace with actual logic
  const isAuthenticated = true; // Replace with your actual authentication logic

  // Handle redirect when the user is not authenticated and tries to access the '/account' page
  if (request.nextUrl.pathname === '/account' && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Handle '/checkout' page access
  if (request.nextUrl.pathname === '/checkout') {
    // Get the 'cartItemsLength' cookie
    const cartItemsLengthCookie = cookies().get('cartItemsLength');

    // If the cookie exists, parse its value
    let cartItemsLength = 0;
    if (cartItemsLengthCookie) {
      cartItemsLength = parseInt(cartItemsLengthCookie.value, 10); // Parse it as an integer
    }

    // If the cart is empty (length is 0), redirect to home
    if (cartItemsLength === 0) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // If no redirects, continue processing the request
  return NextResponse.next();
}
