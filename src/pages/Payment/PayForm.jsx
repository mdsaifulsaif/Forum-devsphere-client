import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoadingPage from "../../Components/LoadingPage";
import { useQuery } from "@tanstack/react-query";

function PayForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await axiosSecure(`/userbyid/${id}`);
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text: error.message,
        confirmButtonColor: "#d33",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Payment Successful!",
        text: "Your membership has been activated.",
        confirmButtonColor: "#129990", // your primary color
      });
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-semibold text-[#129990] mb-4 text-center">
        Pay for Membership
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-4 border rounded-md shadow-sm">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#ff4d4f",
                },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-[#129990] text-white py-2 px-4 rounded hover:bg-[#0e7f7f] transition"
        >
          Pay ${data.cost}
        </button>
      </form>
    </div>
  );
}

export default PayForm;
