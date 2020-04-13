import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const VisibilityFilters = {
	SHOW_ALL: "SHOW_ALL",
	SHOW_COMPLETED: "SHOW_COMPLETED",
	SHOW_ACTIVE: "SHOW_ACTIVE",
};

export const filterSlice = createSlice({
	name: "counter",
	initialState: VisibilityFilters.SHOW_ALL,
	reducers: {
		setVisibilityFilter(state, action) {
			return action.payload;
		},
	},
});

export const { setVisibilityFilter } = filterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;

export default filterSlice.reducer;
