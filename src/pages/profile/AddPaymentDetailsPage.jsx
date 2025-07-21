import React from "react";
import AddPaymentDetails from "../../components/profile/AddPaymentDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);


const AddPaymentDetailsPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="w-full py-6 padding-x">
        <AddPaymentDetails />
      </div>
    </Elements>
  );
};

export default AddPaymentDetailsPage;
