// app/api/razorpay/route.js

import { publicKey, secretKey } from "@/app/Utils/variables";
import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

const razorpay = new Razorpay({
  key_id: publicKey,
  key_secret: secretKey,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();  // Get the amount from request body

    const orderOptions = {
      amount: amount * 100, // Razorpay works in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: uuidv4(),
    };

    const order = await razorpay.orders.create(orderOptions);
    
    return new Response(JSON.stringify({ success: true, orderId: order.id }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, message: error.message }),
      { status: 500 }
    );
  }
}
