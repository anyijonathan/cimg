import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateHeader, makeAdRequest, makeRequest, makeSwaggerRequest } from "./apiConfig";
import CryptoJS from "crypto-js";

const initialState = {
	isAuthenticated: false,
	userRole: "",
	userName: "",
	emailAddress: "",
};

 const generateAdHeader = () => {
	let dateToUse = new Date();
	let UTCTimestamp = dateToUse.toISOString().replace("Z", "");
	let dateInToken = UTCTimestamp.replace("T", "")
	  .replace(":", "")
	  .replace(":", "")
	  .substring(0, UTCTimestamp.length - 7);
	let shaOneEncrypt = CryptoJS.SHA512(dateInToken + process.env.REACT_APP_CLIENT_ID + process.env.REACT_APP_CLIENT_PASSWORD);
	const apiHeader = {
	  "x-token": shaOneEncrypt.toString(CryptoJS.enc.Hex),
	  "Ocp-Apim-Subscription-Key": process.env.REACT_APP_AD_SUBSCRIPTION_KEY,
	  "Ocp-Apim-Trace": true,
	  UTCTimestamp: UTCTimestamp,
	  client_id: process.env.REACT_APP_CLIENT_ID
	};
	return apiHeader;
  }; 

export const adLogin = async (data) => {
	const apiHeader = generateAdHeader();
	const header = {
		...apiHeader,
	  
	};

	try {
		const response = await makeAdRequest.post(
			`/api/ADAuth/validateADDetails`,
			data,
			{
				headers: header,
			}
		);

		return response.data;
	} catch (error) {
		throw error;
		// return error;
	}
};

export const userLogin = async (data) => {
	const apiHeader = generateHeader();
	const header = {
		...apiHeader,
	};

	try {
		const response = await makeSwaggerRequest.post(
			`/api/Account/AuthenticateOnPremADEncryptJsonTwoECBWithEncryptResponseAndRole`,
		data,
		{headers:header}
		);

		return response.data;
	} catch (error) {
		throw error;
		// return error;
	}
};



export const getUserDetails = async (email,Token) => {
	const apiHeader = generateHeader();
	const header = {
		...apiHeader,
	
	};

	try {
		const response = await makeRequest.post(
			`/api/Account/GetUserDetails?email=${email}&Token=${Token}`,
			'',
			{
				headers: header,
			}
		);

		return response.data;
	} catch (error) {
		throw error;
		// return error;
	}
};

let authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		logout: function (state, action) {
			state.isAuthenticated = false;
		},

		setUserRole: function (state, action) {
			state.userRole = action.payload;
		},

		setIsAuthenticated: function (state, action) {
			state.isAuthenticated = action.payload;
		},
		setUsername: function (state, action) {
			state.userName = action.payload;
		},
		setEmail: function (state, action) {
			state.emailAddress = action.payload;
		},
	},
});

export const {
	logout,
	setUserRole,
	setIsAuthenticated,
	setUsername,
	setEmail,
} = authSlice.actions;
export const userSelector = (state) => state.auth;
export default authSlice.reducer;
