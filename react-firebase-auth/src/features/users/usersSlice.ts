import { createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

interface AuthState {
	users: any;
	loading: boolean;
	error: any;
}

const initialState: AuthState = {
	users: [],
	loading: false,
	error: null
};

interface CurrentRepo {}

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getUsersStart(state) {
			state.loading = true;
			state.error = null;
		},
		getUsersSuccess(state, action) {
			state.loading = false;
			state.error = null;
			state.users = action.payload;
		},
		getUsersFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const {
	getUsersStart,
	getUsersSuccess,
	getUsersFailure
} = userSlice.actions;

export const getAllUsers = (): AppThunk => (dispatch) => {
	try {
		dispatch(getUsersStart());
		const response = "sdfasds";
		console.log(response);

		dispatch(getUsersSuccess(response));
	} catch (error) {
		dispatch(getUsersFailure(error));
	}
};

export default userSlice.reducer;
