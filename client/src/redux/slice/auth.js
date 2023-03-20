import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../action/auth";

const initialState = {
  data:
    JSON.parse(
      localStorage.getItem(`${import.meta.env.VITE_APP_PREFIX_LOCAL}_user`)
    ) || null,
  message: "",
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.message = "Logout successful !";
      state.data = null;
      localStorage.removeItem(`${import.meta.env.VITE_APP_PREFIX_LOCAL}_user`);
      localStorage.removeItem(
        `${import.meta.env.VITE_APP_PREFIX_LOCAL}_access_token`
      );
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {});
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const userData = {
        jwt: action.payload.jwt,
        role: action.payload.user.role,
        email: action.payload.user.email,
        id: action.payload.user.id,
        username: action.payload.user.username,
      };
      state.data = userData;
      state.message = "Login successful !";
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.data = null;
      state.message = action.payload.error.message;
    });
  },
});

const { reducer, actions } = authSlice;

export const { logout } = actions;

export default authSlice.reducer;
