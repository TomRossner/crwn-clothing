import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const {data} = await axios.post('/CRWN-Clothing/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({amount: 10000})
      })
      console.log(data)
      // const {paymentIntent: {client_secret}} = response;
      // const paymentResult = await stripe.confirmCardPayment(client_secret, {
      //   payment_method: {
      //     card: elements.getElement(CardElement),
      //     billing_details: {
      //       name: 'Tom Rossner'
      //     }
      //   }
      // })
    } catch (error) {
      console.log(error)
    }

    // if (paymentResult.error) {
    //   alert(paymentResult.error);
    // }
    // else {
    //   if (paymentResult.paymentIntent.status ==='succeeded') {
    //     alert("Payment Successful");
    //   }
    // }
  };

  return (
    <form onSubmit={paymentHandler} className='container'>
      <CardElement className='payment'/>
      <button type='submit' className='btn'>Pay now</button>
    </form>
  )
}

export default Checkout;