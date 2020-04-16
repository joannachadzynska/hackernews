import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
	users: any[];
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	users: [],
	loading: false,
	error: null,
};

const startLoading = (state: AuthState) => {
	state.loading = true;
};

const loadingFailed = (state: AuthState, action: any) => {
	state.loading = false;
	state.error = action.payload;
};

export const userSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		getUsersStart: startLoading,
		getUsersSuccess: (state, action) => {
			console.log(action.payload);
		},
		getUsersFailure: loadingFailed,
	},
});

export const {
	getUsersStart,
	getUsersSuccess,
	getUsersFailure,
} = userSlice.actions;

export default userSlice.reducer;
