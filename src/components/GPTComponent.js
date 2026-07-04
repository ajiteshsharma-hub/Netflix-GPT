import React from "react";
import GPTSearch from "./GPTSearch";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTComponent = () => {
  return (
    <>
      <div className="relative min-h-screen">
        <div className="absolute inset-0 -z-10">
          <img
            src={BG_URL}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-gradient-to-t from-black  w-full h-screen">
          <GPTSearch />
          <GPTMovieSuggestions />
        </div>
      </div>
    </>
  );
};

export default GPTComponent;
