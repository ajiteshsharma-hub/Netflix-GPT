import React from "react";
import { POSTER_URL } from "../utils/constants";

const MovieSuggestionsComponent = (items) => {
  return (
    <div>
      <div className="flex justify-center ml-2">
        <div className=" text-white w-11/12 md:w-1/2 flex flex-col md:flex-row p-4 md:p-6 border-b-2 border-gray-200 items-center md:items-start gap-6 md:gap-12 bg-black/50">
          <img
            className="w-32 md:w-40 rounded-lg cursor-pointer"
            src={POSTER_URL + items.items[0]?.poster_path}
          />
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-xl md:text-3xl font-semibold cursor-pointer">
              {items.items[0].title}
            </h1>
            <h1 className="text-md py-2">{items.items[0]?.overview}</h1>
            <h1 className="text-sm md:text-md font-semibold">
              Average Rating : {items.items[0]?.vote_average}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSuggestionsComponent;
