import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [sentence, setSentence] = useState("");
  const [word, setWord] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = () => {
    const mysentence = sentence.toLowerCase();
    const myword = word.toLowerCase();

    // if  value of word in sentence and return the remaining sentence in index
    if (mysentence.includes(myword)) {
      let index = mysentence.indexOf(myword);
      let remainingSentence = mysentence.slice(index + myword.length);
      console.log(remainingSentence);
      return setResult(remainingSentence);
    } else {
      return setResult("The letter does not exist in the sentence");
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <ToastContainer autoClose={3000} position="top-center" theme="dark" />
        Welcome - {currentUser?.email}
        <input
          type={"text"}
          placeholder="Enter a Sentence "
          className="p-1 my-2 bg-slate-600 rounded-lg"
          onChange={(e) => {
            setSentence(e.target.value);
          }}
        />
        <input
          type={"text"}
          placeholder="Enter a Letter"
          className="p-1 my-2 bg-slate-600 rounded-lg"
          onChange={(e) => {
            setWord(e.target.value);
          }}
        />
        <div className="auth-button m-2" onClick={handleInput}>
          result
        </div>
        <div className="text-xl">{result}</div>
        <button className="auth-button m-2" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Dashboard;
