import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard");
    } catch (error) {
      setError(toast.error(error.message));
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <ToastContainer autoClose={3000} position="top-center" theme="dark" />
      <div className="text-xl text-white">Login</div>
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

        <button className="auth-button m-2" disabled={loading}>
          Login
        </button>
      </form>
      <div>
        Don't have an account?
        <Link to="/auth" className="text-purple-800 px-1">
          Sign Up
        </Link>
      </div>
      <Link to="/phone" className="auth-button text-sm mt-4">
        Login with Phone No.
      </Link>
    </div>
  );
};

export default Login;
