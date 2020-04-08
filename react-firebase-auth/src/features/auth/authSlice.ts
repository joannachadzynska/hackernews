import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { AppThunk, RootState } from "../../app/store";

interface AuthState {
	currentUser: any;
}

const initialState: AuthState = {
	currentUser: null
};

interface CurrentRepo {}

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setCurrentUser(state, action: PayloadAction<any>) {
			state.currentUser = action.payload;
		}
	}
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
