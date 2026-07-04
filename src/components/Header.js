import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

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
    <div className="relative">
      <div className="absolute w-full items-center z-30 bg-gradient-to-b from-black flex justify-between px-4 py-6 md:px-8 md:py-6">
        <img className="w-20 md:w-44 h-auto" src={LOGO_URL} alt="logo" />
        {user && (
          <>
            <div className="hidden md:flex items-center gap-2 md:gap-4">
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
                  className=" h-10 rounded-lg mr-2"
                  src={user?.photoURL}
                  alt="Profile"
                />
                <p className="text-white font-semibold align-middle mt-2">
                  {user?.displayName}
                </p>
              </div>
              <button
                className=" text-white font-semibold"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
            <button
              className="md:hidden text-white text-3xl"
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            >
              ☰
            </button>
          </>
        )}
      </div>

      {menuOpen && (
        <div className="absolute top-16 right-2 w-1/2 bg-black/80 md:hidden z-20 rounded-lg">
          <div className="flex flex-col gap-5 p-5">
            <button
              className="text-left text-white"
              onClick={() => {
                handleGPTToggle();
                setMenuOpen(false);
              }}
            >
              {gpt ? "Home" : "GPT Search"}
            </button>

            {gpt && (
              <select
                className="bg-gray-900 text-white rounded-lg p-2"
                onChange={handleLangChange}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.indetifier} value={lang.indetifier}>
                    {lang.name}
                  </option>
                ))}
              </select>
            )}

            <div className="flex items-center gap-3">
              <img
                className="w-10 rounded-lg"
                src={user?.photoURL}
                alt="Profile"
              />
              <span className="text-white">{user?.displayName}</span>
            </div>

            <button
              className="text-left text-red-500"
              onClick={() => {
                handleSignOut();
                setMenuOpen(false);
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
