import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/UserSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
      //Unsubscribe the listener when the component unmounts
      return () => unsubscribe();
    });
  }, []);
  return (
    <div className="absolute w-full px-8 py-6 p-2 z-30 bg-gradient-to-b from-black flex justify-between">
      <img className="w-44" src={LOGO_URL} alt="logo" />
      {user && (
        <div className="flex items-center gap-4">
          <img className="w-10 rounded-lg" src={user?.photoURL} alt="Profile" />
          <p className="text-white font-semibold border-r border-gray-300 pr-2">
            {user?.displayName}
          </p>
          <button
            className="text-ellipsis text-white font-semibold"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
