import React from "react";
import GPTSearch from "./GPTSearch";
import GPTMovieSuggestions from "./GPTMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GPTComponent = () => {
  return (
    <div className="bg-gradient-to-t from-black  w-full">
      <div className="absolute -z-30">
        <img src={BG_URL} />
      </div>
      <GPTSearch />
      <GPTMovieSuggestions />
    </div>
  );
};

export default GPTComponent;
