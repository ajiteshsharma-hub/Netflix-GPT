import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div className="absolute w-screen px-8 py-4 z-30 bg-gradient-to-b from-black flex justify-between">
      <img
        className="w-44"
        src="https://imgs.search.brave.com/tOJpXUG94iS6_M8_MTS09CiCErpecLhhqCHzPsjUNGw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZnJlZXBuZ2xvZ29z/LmNvbS91cGxvYWRz/L25ldGZsaXgtbG9n/by1kcmF3aW5nLXBu/Zy0xOS5wbmc"
        alt="logo"
      />
      {user && (
        <div className="flex items-center gap-4">
          <img src={user?.photoURL} alt="Profile" />
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
