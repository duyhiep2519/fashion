import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    user: null,
  },
  reducers: {
    userLogin: (state, action) => {
      state.isLogin = true;
      const { token } = action.payload;
      if (token) {
        localStorage.setItem("token", JSON.stringify(token));
      }
    },
    userLogout: (state, action) => {
      state.isLogin = false;
      localStorage.removeItem("token");
    },
    getUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isLogin = true;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { userLogin, getUser, userLogout } = userSlice.actions;

export default userSlice.reducer;
