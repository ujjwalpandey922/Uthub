import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    FetchStar: (state) => {
      state.loading = true;
    },
    FetchSuccess: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    FetchError: (state) => {
      state.error = true;
      state.loading = false;
    },
    Like: (state, action) => {
      if (state.currentVideo.likes.includes(action.payload)) {
        state.currentVideo.likes.splice(
          state.currentVideo.likes.indexOf(action.payload),
          1
        );
      } else {
        state.currentVideo.likes.push(action.payload);
      }
    },
    DisLike: (state, action) => {
      if (state.currentVideo.dislikes.includes(action.payload)) {
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.indexOf(action.payload),
          1
        );
      } else {
        state.currentVideo.dislikes.push(action.payload);
      }
    },
  },
});
export const { FetchError, FetchStar, FetchSuccess, Like, DisLike } =
  videoSlice.actions;
export default videoSlice.reducer;
