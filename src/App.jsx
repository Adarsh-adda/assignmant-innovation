import { Fragment, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import LoginPhone from "./components/LoginPhone";

function App() {
  return (
    <div className="font-poppins bg-slate-900 text-white">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/phone" element={<LoginPhone />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
