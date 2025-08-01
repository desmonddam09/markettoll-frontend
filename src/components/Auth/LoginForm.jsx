import React, { useContext, useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import { BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import SocialLogin from "./SocialLogin";
import ButtonLoader from "../Global/ButtonLoader";
import { getToken, messaging } from "../../firebase/firebase";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.lenght < 8) {
    errors.password = "Password must be 8 characters";
  }

  return errors;
};

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { fetchUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [fcmToken, setFcmToken] = useState("");

  // Request notification permission and retrieve FCM token
  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const fcmToken = await getToken(messaging, {
          vapidKey:
            "BKGaHhuqh_eiZAL-zfFX8S1sONZ3733G8-yIlchOxgUpayZmAF7RUQyCgN2Uoh3_ql1X55_IMiK0x9_fcFhcEOY",
        });
        // console.log("fcmToken >>>", fcmToken);
        setFcmToken(fcmToken);
        localStorage.setItem("fcmTokenMarkettoll", JSON.stringify(fcmToken));
        // return fcmToken;
      } else {
        throw new Error("Notification permission not granted");
      }
    } catch (err) {
      console.error("Error getting FCM token", err);
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const sendFcmToken = async (token) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/users/push-notification-token`,
        {
          platform: "web",
          token: fcmToken,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("fcmToken res >>>", res?.data);
    } catch (error) {
      console.log("err while posting fcmToken >>>", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      // const fcmToken = await requestPermissionAndGetToken();
      // if (fcmToken) {
      setLoading(true);
      console.log(values);
      try {
        const response = await axios.post(
          `${BASE_URL}/users/email-password-login`,
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // console.log("login response >>>>", response);
        if (response.data.success) {
          await sendFcmToken(response?.data?.data?.token);
          Cookies.set("user", JSON.stringify(response?.data?.data));
          localStorage.setItem("user", JSON.stringify(response?.data?.data));
          resetForm();

          
          if (response?.data?.data?.role=="client") {
            fetchUserProfile();
            navigate("/");            
          }
          else{
            fetchUserProfile();
            navigate("/affiliate");            
          }
          return response.data;
        } else {
          console.error("Login failed:", response.data.message);
          throw new Error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setError(error.response.data.message);
        throw new Error(error.message);
      } finally {
        setLoading(false);
      }
      // } else {
      //   toast.error("Something went wrong.");
      // }
    },
  });
  return (
    <div
      className={`w-full min-h-screen relative flex items-center justify-end p-4 md:p-10`}
      style={{
        backgroundImage: `url('/signup-mockup.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: "30px",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="min-h-[90vh] w-full lg:w-1/2 rounded-[30px] bg-[#FFFFFFA6] p-4 md:p-8 xl:p-12 flex flex-col items-start justify-center gap-4"
      >
        <h2 className={`blue-text text-[36px] font-bold`}>
          Welcome To Markettoll!
        </h2>
        <p className="text-base font-medium capitalize">
          Where every need finds its perfect match
        </p>
        {error !== "" && (
          <p className="text-base font-medium text-center mx-auto text-red-500">
            {error}
          </p>
        )}

        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="email" className="text-[14px] font-medium">
            Email
          </label>
          <div className="bg-[#FFFFFF80] rounded-[20px] w-full flex items-center justify-start gap-3 p-4">
            <img
              src="/mail-icon.png"
              alt="mail-icon.png"
              className="w-[17.95px] h-[15.34px]"
            />
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="johnsmith@gmail.com"
              className="w-full bg-transparent text-[14px] font-[400] text-[#5C5C5C] outline-none"
            />
          </div>
          {formik.errors.email ? (
            <div className="text-xs text-red-500">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="w-full flex flex-col items-start gap-1">
          <label htmlFor="phone" className="text-[14px] font-medium">
            Password
          </label>

          <div className="bg-[#FFFFFF80] rounded-[20px] w-full flex items-center justify-start gap-3 p-4">
            <img
              src="/password-icon.png"
              alt="password-icon"
              className="w-[18px] h-[18px]"
            />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter Password"
              className="w-full bg-transparent text-[14px] font-[400] text-[#5C5C5C] outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <LuEye className="text-[#606060]" />
              ) : (
                <LuEyeOff className="text-[#606060]" />
              )}
            </button>
          </div>
          {formik.errors.password ? (
            <div className="text-xs text-red-500">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="text-end w-full">
          <Link
            to="/forgot-password"
            className="text-[14px] font-medium text-end"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="blue-bg text-white rounded-[20px] text-base font-bold py-3.5 h-[50px] w-full"
        >
          {loading ? <ButtonLoader /> : "Log In"}
        </button>

        <p className="text-center text-xs text-[#8B8B8B] mx-auto mt-2.5">OR</p>

        {/* <div className="w-full flex items-center justify-between">
          <GoogleLoginButton />
          <AppleLoginButton />
          <FacebookLoginButton />
        </div> */}
        <SocialLogin />

        <p className="text-sm text-center w-full mt-4">
          <span>Don't Have An Account? </span>
          <Link to="/sign-up" className="light-blue-text font-bold">
            Create One
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
