"use client";

import Images from "./Images";

export default function PaymentOptions() {
  return (
    <ul className="flex gap-1">
    <li>
    <Images
        imageurl="/images/payment_1.png"
        quality="100"
        width="30"
        height="20"
        alt="Payment card"
        classes="block w-full"
        placeholder={true}
      />
    </li>
    <li>
    <Images
        imageurl="/images/payment_2.png"
        quality="100"
        width="30"
        height="20"
        alt="Payment card"
        classes="block w-full"
        placeholder={true}
      />
    </li>
    <li>
    <Images
        imageurl="/images/payment_3.png"
        quality="100"
        width="30"
        height="20"
        alt="Payment card"
        classes="block w-full"
        placeholder={true}
      />
    </li>
    <li>
    <Images
        imageurl="/images/payment_4.png"
        quality="100"
        width="30"
        height="20"
        alt="Payment card"
        classes="block w-full"
        placeholder={true}
      />
    </li>
    <li>
    <Images
        imageurl="/images/payment_5.png"
        quality="100"
        width="30"
        height="20"
        alt="Payment card"
        classes="block w-full"
        placeholder={true}
      />
    </li>
    </ul>
  );
}
