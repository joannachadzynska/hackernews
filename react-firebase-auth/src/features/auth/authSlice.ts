import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../../app/store";

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
		},
		toggleTodo(state, action) {
			// const todo = state.find((todo) => todo.id === action.payload);
			// if (todo) {
			// 	todo.completed = !todo.completed;
			// }
		}
	}
});

export const { setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
