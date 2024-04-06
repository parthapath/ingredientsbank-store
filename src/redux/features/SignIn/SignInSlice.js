import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSignInModal: false,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    openSignInModal: (state, action) => {
      state.showSignInModal = action.payload;
    },
  },
});

export const { openSignInModal } = signInSlice.actions;
export default signInSlice.reducer;
