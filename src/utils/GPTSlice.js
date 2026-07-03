import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    showGPTSearch: false,
    gptMovies: null,
  },
  reducers: {
    toggleGPTButton: (state, action) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGptMovies: (state, action) => {
      state.gptMovies = action.payload;
    },
  },
});

export const { toggleGPTButton, addGptMovies } = GPTSlice.actions;
export default GPTSlice.reducer;
