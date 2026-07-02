import React from "react";
import { useSelector } from "react-redux";

const VideoTitle = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies || movies.length === 0) return <div>Loading...</div>;
  const firstMovie = movies[0];

  return (
    <div className="w-full h-full pt-[17%] px-10 absolute bg-gradient-to-r from-black text-white">
      <div className="w-1/3">
        <h1 className="text-6xl font-bold py-4">{firstMovie.original_title}</h1>
        <p className="text-lg">{firstMovie.overview}</p>
        <div className="py-4">
          <button className="mr-2 bg-white text-lg text-black py-2 px-10 rounded-md font-semibold hover:opacity-80">
            {" "}
            Play
          </button>
          <button className="bg-gray-500 text-lg text-white py-2 px-10 opacity-90 rounded-md font-semibold">
            {" "}
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
