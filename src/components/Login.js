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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errMessage, setErrMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);

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
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/browse");
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
          navigate("/browse");
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
      <div className="absolute bg-gradient-to-b from-white">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/81b52f88-dc76-488d-a939-0cf13a260a6e/web/IN-en-20260622-TRIFECTA-perspective_d39d60ef-cb5a-4793-9546-0a8d9a87948e_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute bg-black my-36 w-3/12 mx-auto right-0 left-0 p-12 text-white bg-opacity-80 rounded-lg"
      >
        <h1 className="text-3xl font-semibold my-4">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            className="my-5 w-full p-2 bg-gray-900"
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
          className="my-5 p-2 w-full bg-red-600 rounded-md"
          onClick={handleValidation}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-2 cursor-pointer" onClick={handleSignUp}>
          {isSignIn
            ? "New to Netflix? Sign up now"
            : "Already registered? Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
