'use client'

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { homeUrl, publicKey } from '../Utils/variables';

const stripePromise = loadStripe(publicKey);

export default function Checkout() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);

    // Example cart items (replace with dynamic cart data)

  
    const items = [
      {
        product_id: 1,
         name: 'Product 1', 
         price: 1,
          quantity: 1 
        },
      // { name: 'Product 2', price: 1, quantity: 2 },
    ];

    try {
      // Create the checkout session by calling your API
      const res = await fetch(`${homeUrl}api/checkout`, {
        method: 'POST',
        body: JSON.stringify({ items }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { sessionId, error } = await res.json();

      // Check for errors from the server
      if (error) {
        throw new Error(error);
      }

      // Ensure sessionId exists before proceeding
      if (!sessionId) {
        throw new Error('Session ID not received');
      }

      // Redirect to Stripe Checkout with the session ID
      const stripe = await stripePromise;
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        console.error("Stripe redirect error:", stripeError);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
}
