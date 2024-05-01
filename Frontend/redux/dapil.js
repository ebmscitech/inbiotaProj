// ** Redux Imports
import { getData } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProvinces = createAsyncThunk('dapil/getProvinces', async (param) => {
  const response = await getData("province/get-provinces")

  return response.data
})

export const getDistricts = createAsyncThunk('dapil/getDistricts', async (param) => {
  const response = await getData(`province/get-province/${param}`)

  return response.data
})

export const getSubDistricts = createAsyncThunk('dapil/getSubDistricts', async (param) => {
  const response = await getData(`province/get-regency/${param}`)

  return response.data
})

export const getDataDapil = createAsyncThunk(
  "dapil/getDataDapil",
  async (params) => {
    const response = await getData(
      `dapil?page=${params.page}&limit=${params.limit}`
      // `dapil?page=${params.username}&limit=${params.limit}&name=${params.name}&type=${params.type}`
    );

    return response.data;
  }
);

export const dapilSlice = createSlice({
  name: "dapil",
  initialState: {
    isDapilModal: false,
    dataProvinces: [],
    dataDistricts: [],
    dataSubDistricts: [],
    dataDapil: [],
  },
  reducers: {
    setIsDapilModal: (state, action) => {
      state.isDapilModal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProvinces.fulfilled, (state, action) => {
      state.dataProvinces = action.payload.data;
    });
    builder.addCase(getDistricts.fulfilled, (state, action) => {
      state.dataDistricts = action.payload.data;
    });
    builder.addCase(getDataDapil.fulfilled, (state, action) => {
      state.dataDapil = action.payload.data;
    });
    builder.addCase(getSubDistricts.fulfilled, (state, action) => {
      state.dataSubDistricts = action.payload.data;
    });
  },
});

export const {
  setIsDapilModal,
} = dapilSlice.actions

export default dapilSlice.reducer;
