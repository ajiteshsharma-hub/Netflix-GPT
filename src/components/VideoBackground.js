import { useEffect } from "react";
import { MOVIE_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addMovieTrailer } from "../utils/MovieSlice";

const VideoBackground = ({ movieId }) => {
  const dispatch = useDispatch();
  const trailerData = useSelector((store) => store.movies.movieTrailer);

  const getVideoData = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      MOVIE_OPTIONS,
    );
    const json = await data.json();
    const filterData = json.results.filter((movie) => movie.type === "Trailer");
    const trailer = filterData.length ? filterData[0] : json.results[0];
    dispatch(addMovieTrailer(trailer));
  };

  useEffect(() => {
    getVideoData();
  }, []);

  return (
    <div className="w-full h-screen">
      <iframe
        className="w-full h-screen"
        src={
          "https://www.youtube.com/embed/" +
          trailerData?.key +
          "?autoplay=1&mute=1&controls=0&cc_load_policy=0&iv_load_policy=3"
        }
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
