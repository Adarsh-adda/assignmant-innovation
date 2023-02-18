import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import OtpInput from "otp-input-react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { ToastContainer, toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const LoginPhone = () => {
  const [otp, setOtp] = useState("");
  const [phone, setphone] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  //   const { setUpRecaptcha } = useAuth();
  //   const { currentUser } = useAuth();
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSendOtp();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };
  const handleSendOtp = () => {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + phone;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOtp(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleVerifyOtp = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <div>
        <ToastContainer autoClose={3000} position="top-center" theme="dark" />
        <label htmlFor="" className="font-bold text-xl text-white text-center">
          Login with phone number
        </label>
      </div>
      {showOtp ? (
        <>
          <div className="flex flex-col items-center justify-center space-y-4">
            <div>
              <label
                htmlFor={phone}
                className="font-bold text-xl text-white text-center"
              >
                Enter Your OTP
              </label>
            </div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container text-black"
            ></OtpInput>
            <button
              className="auth-button text-sm"
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              Verify OTP
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <PhoneInput
              country={"in"}
              onChange={setphone}
              value={phone}
              className=" text-black rounded-lg"
            />
          </div>

          <button
            className="auth-button text-sm"
            onClick={handleSendOtp}
            disabled={loading}
          >
            Send OTP
          </button>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default LoginPhone;
