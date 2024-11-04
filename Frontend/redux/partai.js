// ** Redux Imports
import { getData } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDataPartai = createAsyncThunk(
  "partai/getDataPartai",
  async (params) => {
    const response = await getData(
      `partai?page=${params.page}&limit=${params.limit}`
      // `dapil?page=${params.username}&limit=${params.limit}&name=${params.name}&type=${params.type}`
    );

    return response.data;
  }
);

export const partaiSlice = createSlice({
  name: "partai",
  initialState: {
    isPartaiModal: false,
    dataPartai: [],
  },
  reducers: {
    setIsPartaiModal: (state, action) => {
      state.isPartaiModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getDataPartai.fulfilled, (state, action) => {
    //   state.dataPartai = action.payload.data;
    // });
  },
});

export const {
  setIsPartaiModal,
} = partaiSlice.actions

export default partaiSlice.reducer;
