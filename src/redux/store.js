import { configureStore } from "@reduxjs/toolkit";

import signInReducer from "./features/SignIn/SignInSlice";
import productEnquiryReducer from "./features/ProductEnquiry/ProductEnquirySlice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    productEnquiry: productEnquiryReducer,
  },
});
