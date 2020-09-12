import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "count",
  initialState: {
    page: 1,
    pagesNum: 1,
  },
  reducers: {
    nextPage: (state) => {
      state.page += 1;
    },
    prevPage: (state) => {
      state.page -= 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setPagesNum: (state, action) => {
      state.pagesNum = action.payload;
    },
  },
});

export const {
  prevPage,
  nextPage,
  setPage,
  setPagesNum,
} = counterSlice.actions;

export const setTotalPages = (amount) => (dispatch) => {
  dispatch(setPagesNum(amount));
};

export default counterSlice.reducer;
