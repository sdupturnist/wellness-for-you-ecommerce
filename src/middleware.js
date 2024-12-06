import { NextResponse } from 'next/server';

export function middleware(req) {
 // const checkoutSuccess = req.cookies.get('checkout_success');
  const registerVerifyEmail = req.cookies.get('register_verify_email');

  // Checkout-related redirection
  // if (!checkoutSuccess && (req.nextUrl.pathname === '/checkout/success' || req.nextUrl.pathname === '/checkout/failed')) {
  //   return NextResponse.redirect(new URL('/checkout', req.url));
  // }

  // Register email verification-related redirection
  if (!registerVerifyEmail && (req.nextUrl.pathname === '/check-your-email' || req.nextUrl.pathname === '/confirm-email')) {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  return NextResponse.next();
}

export const config = {
 matcher: ['/check-your-email', '/confirm-email'],
};
