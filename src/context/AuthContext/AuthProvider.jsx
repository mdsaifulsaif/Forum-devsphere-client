import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";

function AuthProvider({ children }) {
  const axiosSecure = UseAxiosSecure();
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [userLoadding, setuserLoadding] = useState(true);
  // create user use email and password
  const createUserEmailPassword = (email, password) => {
    setuserLoadding(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login user use email and password
  const LoginUserEmailPassword = (email, password) => {
    setuserLoadding(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // create user use google
  const createUserUseGoogl = () => {
    setuserLoadding(true);
    return signInWithPopup(auth, provider);
  };
  //update user
  const updateUser = (userinfo) => {
    return updateProfile(auth.currentUser, userinfo);
  };
  //  logOut user
  const LogoutUser = () => {
    return signOut(auth);
  };
  //  get current user observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setuserLoadding(false);

      // if (currentUser?.email) {
      //   const userData = { email: currentUser.email };
      //   axiosSecure
      //     .post("/jwt", userData, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       console.log(res);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const userData = {
    user,
    userLoadding,
    setUser,
    createUserEmailPassword,
    LoginUserEmailPassword,
    createUserUseGoogl,
    updateUser,
    LogoutUser,
  };
  return <AuthContext value={userData}>{children}</AuthContext>;
}

export default AuthProvider;
