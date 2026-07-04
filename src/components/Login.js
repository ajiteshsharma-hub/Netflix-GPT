import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import { validateCredentials } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { BG_URL, PHOTO_URL } from "../utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();

  const handleValidation = () => {
    const message = validateCredentials(
      email.current.value,
      password.current.value,
    );
    setErrMessage(message);

    if (message) return;

    //SignUp
    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
            })
            .catch((error) => {
              setErrMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorMessage);
        });
    }

    //SignIn
    else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value,
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMessage(errorMessage);
        });
    }
  };

  const handleSignUp = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="fixed inset-0 -z-10">
        <img className="h-full w-full object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="absolute inset-0 bg-black/40">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="absolute left-1/2 top-1/2 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black/80 p-6 md:p-12 text-white"
        >
          <h1 className="text-2xl md:text-3xl font-semibold mb-6">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignIn && (
            <input
              ref={name}
              className="my-4 w-full rounded-md p-3 bg-gray-900"
              type="name"
              placeholder="Name"
            />
          )}
          <input
            ref={email}
            className="my-5 w-full p-2 bg-gray-900"
            type="email"
            placeholder="Email or Username"
          />
          <input
            ref={password}
            className="my-5 w-full p-2 bg-gray-900"
            type="password"
            placeholder="Password"
          />
          <p className="my-1 text-red-500">{errMessage}</p>
          <button
            className="mt-6 w-full rounded-md bg-red-600 p-3 font-semibold hover:bg-red-700"
            onClick={handleValidation}
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>
          <p
            className="mt-4 curdor-pointer text-sm md:text-base"
            onClick={handleSignUp}
          >
            {isSignIn
              ? "New to Netflix? Sign up now"
              : "Already registered? Sign in now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
