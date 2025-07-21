import React from "react";
import MyWallet from "../../components/profile/MyWallet";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);


const MyWalletPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="w-full padding-x py-6">
        <MyWallet />
      </div>
    </Elements>
  );
};

export default MyWalletPage;
