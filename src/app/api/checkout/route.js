// app/api/checkout/route.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { items } = await req.json();

    // Ensure there are items in the cart
    if (!items || items.length === 0) {
      return new Response(
        JSON.stringify({ error: 'No items provided in the cart' }),
        { status: 400 }
      );
    }

    // Create a new Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
       price_data: {
          currency: 'inr', // Ensure this matches your currency
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // amount in cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    // Return the session ID
    return new Response(
      JSON.stringify({ sessionId: session.id }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
