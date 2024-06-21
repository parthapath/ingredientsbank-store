import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showProductEnquiryModal: false,
};

const productEnquirySlice = createSlice({
  name: "productEnquiry",
  initialState,
  reducers: {
    openProductEnquiryModal: (state, action) => {
      state.showProductEnquiryModal = action.payload;
    },
  },
});

export const { openProductEnquiryModal } = productEnquirySlice.actions;
export default productEnquirySlice.reducer;
