import React from "react";
import { useSelector } from "react-redux";

const VideoTitle = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies || movies.length === 0) return <div>Loading...</div>;
  const firstMovie = movies[0];

  return (
    <div className="w-full h-full  absolute bg-gradient-to-r from-black text-white pt-24 pl-5 md:pt-[17%] md:px-10">
      <div className="w-full md:w-1/3">
        <h1 className="text-3xl md:text-6xl font-bold py-4">
          {firstMovie.original_title}
        </h1>
        <p className="hidden md:block text-lg">{firstMovie.overview}</p>
        <div className="py-2 md:py-4">
          <button className="mr-2 bg-white text-sm md:text-lg text-black py-1 md:py-2 px-6 md:px-10 rounded-md font-semibold hover:opacity-80">
            {" "}
            Play
          </button>
          <button className="bg-gray-500 text-sm md:text-lg text-white py-1 md:py-2 px-6 md:px-10 opacity-90 rounded-md font-semibold">
            {" "}
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
