import { useSelector } from "react-redux";
import MovieCard from "./MovieList";

const SecondContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="bg-black">
      <div className="-mt-40 z-30 relative">
        <MovieCard title={"Now Playing"} movies={movies.nowPlayingMovies} />
        <MovieCard title={"Popular"} movies={movies.popularMovies} />
        <MovieCard title={"Upcoming"} movies={movies.upcomingMovies} />
        <MovieCard title={"Trending"} movies={movies.nowPlayingMovies} />
        <MovieCard title={"Horror"} movies={movies.nowPlayingMovies} />
      </div>
    </div>
  );
};

export default SecondContainer;
