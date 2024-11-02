// ** Redux Imports
import { getProfile } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCaleg = createAsyncThunk(
    "caleg/getCaleg",
    async (params) => {
        const response = await getProfile(
            `profile-caleg/${params.username}`
        );

        return response.data;
    }
);

export const calegSlice = createSlice({
    name: "caleg",
    initialState: {
        dataCaleg:{},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCaleg.fulfilled, (state, action) => {
          state.dataCaleg = action.payload.data;
        });
    },
});

export const {
} = calegSlice.actions

export default calegSlice.reducer;
