import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
  name: "user",
  initialState: {
    username: "",
    accessToken: "",
    refreshToken: "",
    pwd_temp: false,
    permissions: [],
  },
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      state.pwd_temp = action.payload.pwd_temp;
      state.permissions = action.payload.permissions;
    },
    logout: (state) => {
      state.accessToken = "";
      state.refreshToken = "";
      state.username = "";
      state.pwd_temp = false;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setPwdTemp: (state, action) => {
      state.pwd_temp = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setPwdTemp } = userStore.actions;

export default userStore.reducer;
