// ** Redux Imports
import { getData } from "@/api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getDataAspirasi = createAsyncThunk(
    "aspirasi/getDataAspirasi",
    async (params) => {
        const response = await getData(
            `aspiration${params}`
            // `aspiration?page=${params.page}&limit=${params.limit}`
        );

        return response.data;
    }
);

export const aspirasiSlice = createSlice({
    name: "aspirasi",
    initialState: {
        isAspirasiModal: false,
        dataDevelopment: [],
        selectedCaleg: {
            id: "",
            name: ""
        },
        dataAspirasi: [],
        dataDevelopmentLainnya: "",
    },
    reducers: {
        setIsAspirasiModal: (state, action) => {
            state.isAspirasiModal = action.payload;
        },
        setDataDevelopment: (state, action) => {
            state.dataDevelopment = action.payload;
        },
        setSelectedCaleg: (state, action) => {
            state.selectedCaleg = action.payload;
        },
        setDataDevelopmentLainnya: (state, action) => {
            state.dataDevelopmentLainnya = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getDataAspirasi.fulfilled, (state, action) => {
            state.dataAspirasi = action.payload.data;
        });
    },
});

export const {
    setIsAspirasiModal,
    setDataDevelopment,
    setSelectedCaleg,
    setDataDevelopmentLainnya,
} = aspirasiSlice.actions

export default aspirasiSlice.reducer;
