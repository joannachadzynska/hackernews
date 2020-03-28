import { combineReducers } from "@reduxjs/toolkit";
import storiesReducer from "../features/stories/storiesSlice";

const rootReducer = combineReducers({
	stories: storiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
