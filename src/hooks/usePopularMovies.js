import { useDispatch } from "react-redux";
import { MOVIE_OPTIONS, MOVIE_URL } from "../utils/constants";
import { addNowPlayingMovies, addPopularMovies } from "../utils/MovieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      MOVIE_OPTIONS,
    );
    const json = await data.json();
    dispatch(addPopularMovies(json.results));
  };

  useEffect(() => {
    getNowPlayingMovies();
  }, []);
};

export default usePopularMovies;
