import { createSlice } from "@reduxjs/toolkit";
import { Story } from "../../components/+List/types";
import { AppThunk } from "../../app/store";
import axios from "axios";

type SliceState = {
	data: Array<Story>;
	page: any;
	isLoading: boolean;
	isError: boolean;
};

let initialState: SliceState = {
	data: [],
	page: 0,
	isLoading: false,
	isError: false
};

const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {
		getStoriesStart(state) {
			state.isLoading = true;
			state.isError = false;
		},
		getStoriesSuccess(state, action) {
			state.isLoading = false;
			state.isError = false;
			state.data =
				action.payload.page === 0
					? action.payload.list
					: state.data.concat(action.payload.list);
			state.page = action.payload.page;
		},
		getStoriesFailure(state) {
			state.isLoading = false;
			state.isError = true;
		},
		removeStory(state, action) {
			state.data = state.data.filter(
				(story: any) => action.payload.objectID !== story.objectID
			);
		},
		setCurrentPage(state, action) {
			state.page = action.payload.page;
		}
	}
});

export const {
	getStoriesStart,
	getStoriesSuccess,
	getStoriesFailure,
	setCurrentPage,
	removeStory
} = storiesSlice.actions;

export const getStories = (url: any): AppThunk => async (dispatch) => {
	dispatch(getStoriesStart());
	try {
		const result = await axios.get(url);
		dispatch(
			getStoriesSuccess({ list: result.data.hits, page: result.data.page })
		);
	} catch {
		dispatch(getStoriesFailure());
	}
};

export default storiesSlice.reducer;
