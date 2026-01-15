import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    userExist: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotexist: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
});

export default authSlice;


export const {userExist,userNotexist} = authSlice.actions
