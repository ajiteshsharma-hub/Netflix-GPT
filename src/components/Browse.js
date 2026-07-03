import Header from "./Header";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import SecondContainer from "./SecondContainer";
import { useSelector } from "react-redux";
import GPTComponent from "./GPTComponent";

const Browse = () => {
  const gpt = useSelector((store) => store.GPT.showGPTSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {gpt ? (
        <GPTComponent />
      ) : (
        <>
          <MainContainer />
          <SecondContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
