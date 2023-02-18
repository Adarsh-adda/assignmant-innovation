import React from "react";
import { Link } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup";

const Home = () => {
  return (
    <div className="text-xl h-screen ">
      <div className="flex flex-col justify-center items-center h-screen space-y-6">
        <Link to="/login" className="auth-button">
          Login with Email
        </Link>
        <Link to="/phone" className="auth-button ">
          Login with Phone
        </Link>
      </div>
    </div>
  );
};

export default Home;
