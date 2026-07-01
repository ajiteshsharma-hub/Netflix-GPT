import React from "react";
import { useSelector } from "react-redux";

const VideoTitle = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies || movies.length === 0) return <div>Loading...</div>;
  const firstMovie = movies[0];
  console.log(firstMovie);

  return (
    <div className="py-56 px-10 w-1/3 ">
      <h1 className="text-6xl font-bold py-4">{firstMovie.original_title}</h1>
      <p className="text-lg">{firstMovie.overview}</p>
      <div className="py-4">
        <button className="mr-2 bg-gray-300 text-white py-2 px-10 opacity-80 rounded-md">
          {" "}
          ▶️ Play
        </button>
        <button className="bg-gray-300 text-white py-2 px-10 opacity-80 rounded-md">
          {" "}
          ▶️ Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
