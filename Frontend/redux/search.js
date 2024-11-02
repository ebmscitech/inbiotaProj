// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHome } from "../api";

export const getFindUser = createAsyncThunk(
    "search/getFindUser",
    async (params) => {
        const response = await getHome(
            `find-caleg?name=${params.name ? params.name : ""}&dapil=${params.dapil ? params.dapil : ""}&partai=${params.partai ? params.partai : ""}`
        );

        return response.data;
    }
);

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
        builder.addCase(getFindUser.fulfilled, (state, action) => {
            state.listUserSearch = action.payload.data;
        });
    },
});

export const {
    selectCaleg,
    selectPartai,
    selectDapil,
} = searchSlice.actions

export default searchSlice.reducer;
