import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { languages } from "../utils/languages";
import client from "../utils/openAi";
import { MOVIE_OPTIONS } from "../utils/constants";
import { addGptMovies } from "../utils/GPTSlice";

const GPTSearch = () => {
  const lang = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();

  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      MOVIE_OPTIONS,
    );
    const json = await data.json();
    const exactMatch = json.results.filter((m) =>
      m.title
        ? m.title.toLowerCase() === movie.toLowerCase()
        : m.original_title.toLowerCase() === movie.toLowerCase,
    );
    return exactMatch;
  };

  const handleGPTSearch = async () => {
    //   const response = await client.responses.create({
    //     model: "gpt-4.1-mini",
    //     input: `
    //   Act as a Movie Recommendation System.
    //   Suggest 5 movies for the query: "${searchText.current.value}".
    //   Only return the movie names, separated by commas.
    //   Example:
    //   Gadar, Sholay, Don, Golmaal, Koi Mil Gaya
    // `,
    //   });

    //   const results = response.choices?.[0]?.message?.content.split(",");

    const results = [
      "Inception",
      "Interstellar",
      "Ford v Ferrari",
      "Cars",
      "Spider-Man: No Way Home",
      "Phir Hera Pheri",
    ];
    const promiseArray = results.map((movie) => searchMovieTMDB(movie));
    const movies = await Promise.all(promiseArray);
    dispatch(addGptMovies(movies));
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          className="m-4 p-4 col-span-10"
          placeholder={languages[lang].gptPlaceholder}
          type="text"
        />
        <button
          className="bg-red-600 py-2 px-4 m-4 rounded-lg col-span-2 text-white font-semibold"
          onClick={handleGPTSearch}
        >
          {languages[lang].Search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearch;
