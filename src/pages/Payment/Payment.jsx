import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "./PayForm";
import { loadStripe } from "@stripe/stripe-js";
const ke =
  "pk_test_51RjXU9JpCtTho2XJPhcExBLWDW2nvTjLnSEdMMvfETu1wkivQbvdVapandbF5DtNG58OGbRni9D5zDRowwM11mY700EFPJ0n3z";
const stripePromise = loadStripe(ke);
function Payment() {
  return (
    <div className="min-h-[70vh] py-5">
      <Elements stripe={stripePromise}>
        <PayForm></PayForm>
      </Elements>
    </div>
  );
}

export default Payment;
