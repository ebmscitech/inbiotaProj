// ** Redux Imports
import { getData } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDashboard = createAsyncThunk('dashboard/getDashboard', async (param) => {
  const response = await getData(`page/dashboard${param}`)

  return response.data
})

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    isDapilModal: false,
    dataPageVisit: {},
    dataAspirasi: [],
  },
  reducers: {
    setIsDapilModal: (state, action) => {
      state.isDapilModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getDashboard.fulfilled, (state, action) => {
      state.dataPageVisit = action.payload.data.pageVisit;
      state.dataAspirasi = action.payload.data.aspirasi;
    });
  },
});

export const {
  setIsDapilModal,
} = dashboardSlice.actions

export default dashboardSlice.reducer;
