import React from "react";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import { useSelector } from "react-redux";
import SecondContainer from "./SecondContainer";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies.nowPlayingMovies);
  if (!movies || movies.length === 0) return <div>Loading...</div>;
  const firstMovie = movies[0];

  return (
    <div className="bg-black">
      <VideoTitle />
      <VideoBackground movieId={firstMovie.id} />
      <SecondContainer />
    </div>
  );
};

export default MainContainer;
