import React from "react";
import { useSelector } from "react-redux";
import { POSTER_URL } from "../utils/constants";
import MovieSuggestionsComponent from "./MovieSuggestionsComponent";

const GPTMovieSuggestions = () => {
  const movieData = useSelector((store) => store.GPT.gptMovies);
  if (!movieData) return null;

  return (
    <div className=" h-[70vh] overflow-y-auto">
      {movieData.map((movies, index) => (
        <MovieSuggestionsComponent key={index} items={movies} />
      ))}
    </div>
  );
};

export default GPTMovieSuggestions;
