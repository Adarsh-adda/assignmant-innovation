import React, { useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../config/firebase";
const AuthContext = React.createContext();

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = React.useState({});

  // signInWithEmailAndPassword

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logout = () => {
    return signOut(auth);
  };
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  // function setUpRecaptcha(number) {
  //   const recaptchaVerifier = new RecaptchaVerifier(
  //     "recaptcha-container",
  //     {},
  //     auth
  //   );
  //   recaptchaVerifier.render();
  //   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  // }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setCurrentUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    createUser,
    logout,
    login,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
};
