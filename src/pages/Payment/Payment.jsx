import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "./PayForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PayForm></PayForm>
    </Elements>
  );
}

export default Payment;
