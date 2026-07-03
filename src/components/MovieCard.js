import React from "react";
import { POSTER_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  return (
    <div className="w-48 pr-4 cursor-pointer">
      <img src={POSTER_URL + movie.poster_path} />
      <p className="text-white font-sans text-md text-center pt-2 font-semibold">
        {movie.original_title}
      </p>
    </div>
  );
};

export default MovieCard;
