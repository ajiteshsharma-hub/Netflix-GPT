import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-6 bg-transparent w-full pb-4">
      <h1 className="text-white py-4 text-xl md:text-3xl font-semibold">
        {" "}
        {title}
      </h1>
      <div className="flex py-2 overflow-x-scroll">
        <div className="flex">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
