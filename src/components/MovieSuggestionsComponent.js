import React from "react";
import { POSTER_URL } from "../utils/constants";

const MovieSuggestionsComponent = (items) => {
  return (
    <div>
      <div className="flex justify-center ml-2">
        <div className=" text-white pl-16 w-1/2 flex gap-36 pt-2 border-b-2 border-gray-200 pb-6 bg-black/50">
          <img
            className="w-40 cursor-pointer"
            src={POSTER_URL + items.items[0]?.poster_path}
          />
          <div className="w-1/2">
            <h1 className="text-3xl font-semibold cursor-pointer">
              {items.items[0].title}
            </h1>
            <h1 className="text-md py-2">{items.items[0]?.overview}</h1>
            <h1 className="text-md font-semibold">
              Average Rating : {items.items[0]?.vote_average}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieSuggestionsComponent;
