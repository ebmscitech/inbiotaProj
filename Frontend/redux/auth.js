// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        isRegisterModal: false,
    },
    reducers: {
        setIsRegisterModal: (state, action) => {
            state.isRegisterModal = action.payload;
        },
    },
});

export const {
    setIsRegisterModal,
} = authSlice.actions

export default authSlice.reducer;
