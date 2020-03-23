import { Stories, Story } from "./components/+List/types";

export type StoriesState = {
	data: Stories;
	isLoading: boolean;
	isError: boolean;
};

interface StoriesFetchInitAction {
	type: "STORIES_FETCH_INIT";
}

interface StoriesFetchSuccessAction {
	type: "STORIES_FETCH_SUCCESS";
	payload: Stories;
}

interface StoriesFetchFailureAction {
	type: "STORIES_FETCH_FAILURE";
}

interface StoriesRemoveAction {
	type: "REMOVE_STORY";
	payload: Story;
}

export type StoriesAction =
	| StoriesFetchInitAction
	| StoriesFetchSuccessAction
	| StoriesFetchFailureAction
	| StoriesRemoveAction;
