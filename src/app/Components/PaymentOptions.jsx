"use client";

import Images from "./Images";

export default function PaymentOptions() {
  return (
    <ul className="flex gap-[5px] [&>*]:bg-white [&>*]:w-[35px] [&>*]:rounded-[2px] [&>*]:overflow-hidden ">
      <li>
        <Images
          imageurl="/images/payment_1.svg"
          quality="100"
          width="30"
          height="20"
          alt="Payment card"
          classes="block w-full w-[35px]"
          placeholder={true}
        />
      </li>
      <li>
        <Images
          imageurl="/images/payment_2.svg"
          quality="100"
          width="30"
          height="20"
          alt="Payment card"
          classes="block w-full w-[35px]"
          placeholder={true}
        />
      </li>
      <li>
        <Images
          imageurl="/images/payment_3.svg"
          quality="100"
          width="30"
          height="20"
          alt="Payment card"
          classes="block w-full w-[35px]"
          placeholder={true}
        />
      </li>
      <li>
        <Images
          imageurl="/images/payment_4.svg"
          quality="100"
          width="30"
          height="20"
          alt="Payment card"
          classes="block w-full w-[35px]"
          placeholder={true}
        />
      </li>
      <li>
        <Images
          imageurl="/images/payment_5.svg"
          quality="100"
          width="30"
          height="20"
          alt="Payment card"
          classes="block w-full w-[35px]"
          placeholder={true}
        />
      </li>
    </ul>
  );
}
