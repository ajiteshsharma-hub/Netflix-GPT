import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  console.log(movies);

  return (
    <div className="px-6 bg-transparent w-full pb-4">
      <h1 className="text-white py-4 text-2xl font-semibold"> {title}</h1>
      <div className="flex py-2 overflow-x-scroll scrollbar-none">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard poster={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
