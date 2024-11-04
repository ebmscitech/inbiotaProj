// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import moment from "moment";
import momentID from "moment/locale/id";
import { getHome, getProfile } from '../api';

export const timezoneUser = moment().format("Z").replace(/[0:]/g, "");
export const momentLocale = moment().locale("id", momentID);

export const todayDate = () => {
  return moment().format("YYYY-MM-DD")
};

export const monthDate = (date = null) => {
  //date must in string and "YYYY-MM-DD" formated
  let result = {
    first: "",
    last: ""
  };
  const format = "YYYY-MM-DD";

  const today = date ? date : moment().format(format);
  result.first = moment(today, format).startOf("month").format(format);
  result.last = moment(today, format).endOf("month").format(format);

  return result;
};

export const quartalNow = () => {
  let d = new Date(),
    month = "" + (d.getMonth() + 1),
    year = d.getFullYear(),
    result = "Q";

  if (month < 4) result += "1 - ";
  else if (month < 7) result += "2 - ";
  else if (month < 10) result += "3 - ";
  else result += "4 - ";

  result += year;

  return result;
};

// ** Slice if the text is too long
export const truncate = (input) => {
  // Check if input is defined
  if (typeof input === 'undefined') {
    return ''; // or handle it in a way that makes sense for your use case
  }

  if (input.length > 45) {
    return input.substring(0, 45) + "...";
  }
  return input;
};

export const displayWindowSize = (types) => {
  var val = 0;
  if (types.toLowerCase() == "width") {
    val = document.documentElement.clientWidth;
  } else if (types.toLowerCase() == "height") {
    val = document.documentElement.clientHeight;
  }
  return val;
};

export const getListPartai = createAsyncThunk(
  "global/getListPartai",
  async (params) => {
    const response = await getHome(
      `partai`
    );

    return response.data;
  }
);

export const getListDapil = createAsyncThunk(
  "global/getListDapil",
  async (params) => {
    const response = await getHome(
      `dapil`
    );

    return response.data;
  }
);

export const getListCaleg = createAsyncThunk(
  "global/getListCaleg",
  async (params) => {
    const response = await getProfile(
      `profile-caleg?page=1&limit=10`
    );

    return response.data;
  }
);

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    GMT: timezoneUser,
    keywordSearch: "",
    mainLanguage: "id",
    //home
    listPartai: [],
    listDapil: [],
    listCaleg: [],
    //modal global
    isConfirmationModal: false,
    isConfirm: false,
  },
  reducers: {
    searchKeyword: (state, action) => {
      state.keywordSearch = action.payload;
    },
    toogleLanguage: (state, action) => {
      state.mainLanguage = action.payload;
    },
    setIsConfirmationModal: (state, action) => {
      state.isConfirmationModal = action.payload;
    },
    setIsConfirm: (state, action) => {
      state.isConfirm = action.payload;
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(getListPartai.fulfilled, (state, action) => {
    //   state.listPartai = action.payload.data;
    // });
    // builder.addCase(getListDapil.fulfilled, (state, action) => {
    //   state.listDapil = action.payload.data;
    // });
    // builder.addCase(getListCaleg.fulfilled, (state, action) => {
    //   state.listCaleg = action.payload.data;
    // });
  },
});

export const {
  searchKeyword,
  toogleLanguage,
  setIsConfirmationModal,
  setIsConfirm,
} = globalSlice.actions

export default globalSlice.reducer
