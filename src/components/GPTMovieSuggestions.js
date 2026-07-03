import React from "react";
import { useSelector } from "react-redux";
import { POSTER_URL } from "../utils/constants";
import MovieSuggestionsComponent from "./MovieSuggestionsComponent";

const GPTMovieSuggestions = () => {
  const movieData = useSelector((store) => store.GPT.gptMovies);
  if (!movieData) return null;
  console.log(movieData);

  return (
    <div className="h-screen overflow-y-scroll">
      {movieData.map((movies, index) => (
        <MovieSuggestionsComponent key={index} items={movies} />
      ))}
    </div>
  );
};

export default GPTMovieSuggestions;
