import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import movieReducer from "./MovieSlice";
import gptReducer from "./GPTSlice";
import configReducer from "./configSlice";

const AppStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    GPT: gptReducer,
    config: configReducer,
  },
});

export default AppStore;
