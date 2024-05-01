// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    dataLembaga: "",
    dataVisi: [],
    dataMisi: [],
    dataPixel: [],
    activeTab: 1,
    dataPhotoProfile: null,
    dataCoverProfile: null,
    isOrganizationModal: false,
    isAchievementModal: false,
    isEducationModal: false,
    isBackgroundModal: false,
  },
  reducers: {
    setDataLembaga: (state, action) => {
      state.dataLembaga = action.payload;
    },
    setDataVisi: (state, action) => {
      state.dataVisi = action.payload;
    },
    setDataMisi: (state, action) => {
      state.dataMisi = action.payload;
    },
    setDataPixel: (state, action) => {
      state.dataPixel = action.payload;
    },
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setDataPhotoProfile: (state, action) => {
      state.dataPhotoProfile = action.payload;
    },
    setDataCoverProfile: (state, action) => {
      state.dataCoverProfile = action.payload;
    },
    setIsOrganizationModal: (state, action) => {
      state.isOrganizationModal = action.payload;
    },
    setIsAchievementModal: (state, action) => {
      state.isAchievementModal = action.payload;
    },
    setIsEducationModal: (state, action) => {
      state.isEducationModal = action.payload;
    },
    setIsBackgroundModal: (state, action) => {
      state.isBackgroundModal = action.payload;
    },
  },
});

export const {
  setDataLembaga,
  setDataVisi,
  setDataMisi,
  setDataPixel,
  setActiveTab,
  setDataPhotoProfile,
  setDataCoverProfile,
  setIsOrganizationModal,
  setIsAchievementModal,
  setIsEducationModal,
  setIsBackgroundModal,
} = profileSlice.actions

export default profileSlice.reducer;
