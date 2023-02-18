import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();
  const { createUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError(toast.error("Passwords do not match"));
    }
    try {
      setLoading(true);
      setError("");
      await createUser(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      setError(toast.error(error.message));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <ToastContainer autoClose={3000} position="top-center" theme="dark" />
      <div className="text-2xl">Create an Account</div>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          type={"email"}
          placeholder="Email"
          className="p-1 my-2 bg-slate-600 rounded-lg"
          ref={emailRef}
        />
        <input
          type={"password"}
          placeholder="Password"
          className="p-1 my-2 bg-slate-600 rounded-lg"
          ref={passwordRef}
        />
        <input
          type={"password"}
          placeholder="Confirm Password"
          className="p-1 my-2 bg-slate-600 rounded-lg"
          ref={confirmPasswordRef}
        />
        <button className="auth-button m-2" disabled={loading}>
          SignUp
        </button>
      </form>
      <div>
        have an account?{" "}
        <Link to="/login" className="text-purple-800">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
