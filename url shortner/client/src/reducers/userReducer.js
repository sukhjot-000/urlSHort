import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  token: ""
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('setUser', (state, action) => {
      state.userName = action.payload.userName;
      state.token = action.payload.token;
      window.localStorage.setItem('userName', action.payload.userName);
      window.localStorage.setItem('token', action.payload.token);
    });
});
