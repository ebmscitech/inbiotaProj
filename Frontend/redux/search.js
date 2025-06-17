// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
    name: "search",
    initialState: {
        selectedCaleg: "", // by username
        selectedPartai: {
            id: "",
            name: ""
        }, // by id
        selectedDapil: {
            id: "",
            name: ""
        }, // by id
        listUserSearch: [], // return api find user
    },
    reducers: {
        selectCaleg: (state, action) => {
            state.selectedCaleg = action.payload;
        },
        selectPartai: (state, action) => {
            state.selectedPartai = action.payload;
        },
        selectDapil: (state, action) => {
            state.selectedDapil = action.payload;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(getFindUser.fulfilled, (state, action) => {
        //     state.listUserSearch = action.payload.data;
        // });
    },
});

export const {
    selectCaleg,
    selectPartai,
    selectDapil,
} = searchSlice.actions

export default searchSlice.reducer;
