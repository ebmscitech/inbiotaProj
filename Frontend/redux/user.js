// ** Redux Imports
import { getData } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDataUsers = createAsyncThunk(
  "user/getDataUsers",
  async (params) => {
      const response = await getData(
          `auth/users?page=${params.page}&limit=${params.limit}`
      );

      return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    dataUsers: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getDataUsers.fulfilled, (state, action) => {
      state.dataUsers = action.payload.data;
    });
  },
});

export const {
} = userSlice.actions

export default userSlice.reducer;
