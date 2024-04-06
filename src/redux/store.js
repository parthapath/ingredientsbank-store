import { configureStore } from "@reduxjs/toolkit";

import signInReducer from "./features/SignIn/SignInSlice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
  },
});
