import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/UserSlice";
import { LANGUAGES, LOGO_URL } from "../utils/constants";
import { toggleGPTButton } from "../utils/GPTSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const gpt = useSelector((store) => store.GPT.showGPTSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  const handleGPTToggle = () => {
    dispatch(toggleGPTButton());
  };

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value));
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
          <button
            className="text-ellipsis text-white font-semibold"
            onClick={handleGPTToggle}
          >
            {gpt ? "Home" : "GPT Search"}
          </button>
          {gpt && (
            <select
              className="bg-transparent text-white rounded-lg font-semibold"
              onChange={handleLangChange}
            >
              {LANGUAGES.map((lang) => (
                <option
                  className="bg-gray-900 font-semibold "
                  value={lang.indetifier}
                  key={lang.indetifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <div className=" border-l border-gray-300 pl-2 flex">
            <img
              className="w-10 rounded-lg mr-2"
              src={user?.photoURL}
              alt="Profile"
            />
            <p className="text-white font-semibold align-middle mt-2">
              {user?.displayName}
            </p>
          </div>
          <button className=" text-white font-semibold" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
