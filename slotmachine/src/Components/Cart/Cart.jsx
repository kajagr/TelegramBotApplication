import React, {useState} from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import "./Cart.css"
import Button from "../Button/Button"



function Cart({ cartItems = [], onCheckout }) {

  let totalPrice = 0
  cartItems.forEach((item) => {
    totalPrice += item.price * item.quantity
  })

  // const makePayment = async () => {
  //   const stripePromise = await loadStripe("pk_test_51PmCTtIfQEBOdjOkO2r6sOsjobm4pgiIlJYjGsXAS5scd1A35WNKUXVNorsI6Pgw5BpysnYarWbSmvkvmWO44sPE007T0Ut4YR")
    
  //   const body = {
  //     products: cartItems
  //   }

  //   const headers = {
  //     "Content-Type":"application/json"
  //   }

  //   const response = await fetch(`${apiURL}/create-checkout-session`, {
  //     method: 'POST',
  //     headers: headers,
  //     body: JSON.stringify(body)
  //   })

  //   const session = await response.json()

  //   const result = stripe.redirectToCheckout({
  //     sessionId:session.id
  //   })

  //   if(result.error) {
  //     console.log(result.error)
  //   }
  // }


  return (
    <div className="cart__container">
      {cartItems.length === 0 ? "No items in cart" : ""}
      <br />
      <span className=""> Total Price: {totalPrice.toFixed(2)} $</span>
      
      <Button
        title={`${cartItems.length === 0 ? "Order !" : "Checkout"}`}
        type="checkout"
        disable={cartItems.length === 0 ? true : false}
        // onClick={makePayment}
      />
    </div>
  );
}

export default Cart
