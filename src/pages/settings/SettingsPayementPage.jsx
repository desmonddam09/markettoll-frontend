import axios from "axios";
import React, { useContext, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { BASE_URL } from "../../api/api";
import { AuthContext } from "../../context/authContext";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import AddBankAccountForm from "./AddBankAccountForm";
import { useFormik } from "formik";
import ButtonLoader from "../../components/Global/ButtonLoader";
import SettingsAddCard from "./SettingsAddCard";
import SettingsAddBankAccount from "./SettingsAddBankAccount";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

const validate = (values) => {
  const errors = {};
  if (!values.accountNumber) {
    errors.accountNumber = "Required";
  } else if (
    values.accountNumber.length > 12 ||
    values.accountNumber.length < 12
  ) {
    errors.accountNumber = "Account number must be 12 digits";
  }

  if (!values.routingNumber) {
    errors.routingNumber = "Required";
  } else if (
    values.routingNumber.length > 9 ||
    values.routingNumber.length < 9
  ) {
    errors.routingNumber = "Routing number must be 9 digits";
  }

  if (!values.day) {
    errors.day = "Required";
  } else if (values.day.length < 2 || values.day.length > 2) {
    errors.day = "Day must be 2 digits";
  }

  if (!values.month) {
    errors.month = "Required";
  } else if (values.month.length > 2 || values.month.length < 2) {
    errors.month = "Month must be 2 digits";
  }

  if (!values.year) {
    errors.year = "Required";
  } else if (values.year.length < 4 || values.year.length > 4) {
    errors.year = "Year must be 4 digits";
  }

  if (!values.ssn) {
    errors.ssn = "Required";
  } else if (values.ssn.length < 9 || values.ssn.length > 9) {
    errors.ssn = "SSN must be 9 digits";
  }

  return errors;
};

const SettingsPayementPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="w-full px-5">
        <h2 className="font-bold text-[28px] blue-text mb-5">Payment</h2>
        <div className="w-full border-[0.5px] border-gray-100 mb-5" />
        <SettingsAddCard />
        <SettingsAddBankAccount />
      </div>{" "}
    </Elements>
  );
};

export default SettingsPayementPage;
