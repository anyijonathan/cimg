import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateHeader, makeRequest } from "./apiConfig";


const initialState = {
  userId: 0,
};



export const fetchDashboardData = async ( email, role) => {
  const apiHeader = generateHeader();
  const header = {
    ...apiHeader,
    "UserEmail": email,
    "Role": role
  };

  try {
    const response = await makeRequest.get(`/api/AirtimeBiller/GetAirtimeDataBillerAdminDashboard`, {
      headers: header,
    });

    return response.data;
  } catch (error) {
      throw error;
  }
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    setId: function (state, action) {
      state.userId = action.payload;
    },
  },
});



export const dashboardSelector = (state) => state.dashboardSlice;
export default dashboardSlice.reducer;
