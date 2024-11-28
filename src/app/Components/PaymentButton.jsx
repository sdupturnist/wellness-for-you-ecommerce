'use client'

import RazorPayment from "./RazorPaymentButton"



export default function PaymentButton({ message, type, onClose, userData }){
    return (
        <RazorPayment 
        userData={userData}
        />
    )
}