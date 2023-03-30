import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogInStar: (state) => {
      state.loading = true;
    },
    LogInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    LogInError: (state) => {
      state.error = true;
      state.loading = false;
    },
    LogOut: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },

    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.indexOf(action.payload),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },
  },
});
export const { LogInError, LogInStar, LogInSuccess, LogOut, subscription } =
  userSlice.actions;
export default userSlice.reducer;
