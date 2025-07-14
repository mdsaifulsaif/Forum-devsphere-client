import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import PayForm from "./PayForm";
import { loadStripe } from "@stripe/stripe-js";
import MembershipBenefits from "../../Components/MembershipBenefits";
const ke =
  "pk_test_51RjXU9JpCtTho2XJPhcExBLWDW2nvTjLnSEdMMvfETu1wkivQbvdVapandbF5DtNG58OGbRni9D5zDRowwM11mY700EFPJ0n3z";
const stripePromise = loadStripe(ke);
function Payment() {
  return (
    <div className="min-h-[70vh] flex-col md:flex-row max-w-6xl mx-auto px-3 flex items-center justify-center py-5">
      <MembershipBenefits />
      <Elements stripe={stripePromise}>
        <PayForm></PayForm>
      </Elements>
    </div>
  );
}

export default Payment;
