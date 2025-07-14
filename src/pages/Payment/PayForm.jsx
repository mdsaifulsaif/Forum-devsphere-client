import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import LoadingPage from "../../Components/LoadingPage";
import { useQuery } from "@tanstack/react-query";

function PayForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const [err, setErr] = useState("");

  const {
    isPending,
    isError,
    data: userDAta,
    error,
  } = useQuery({
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
      setErr(error.message);
    } else {
      setErr("");
      console.log("[PaymentMethod]", paymentMethod);
    }

    // send data to backend
    // console.log(userDAta);
    const amount = userDAta?.cost;
    const amountCents = amount * 100;

    const res = await axiosSecure.post("/create-payment-intent", {
      amountCents,
      userId: userDAta?._id,
    });
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "name",
        },
      },
    });

    if (result.error) {
      setErr(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        // update user
        // ✅ Update user collection in database
        const transactionId = result.paymentIntent.id;
        await axiosSecure.patch(`/users/payment-success/${userDAta?._id}`, {
          transactionId,
          badge: "Gold",
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Your membership has been activated.",
          confirmButtonColor: "#129990", // your primary color
        });
        navigate("/dashboard/addpost");
      }
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
          Pay ${userDAta?.cost}
        </button>
        <p className="text-red-500 pt-5 text-sm">{err}</p>
      </form>
    </div>
  );
}

export default PayForm;
