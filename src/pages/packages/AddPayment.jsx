import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AddPaymentPage from "./AddPaymentPage";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);


const AddPayment = () => {
  return (
    <Elements stripe={stripePromise}>
      <AddPaymentPage />
    </Elements>
  );
};

export default AddPayment;
