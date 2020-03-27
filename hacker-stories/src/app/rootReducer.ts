import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import storiesReducer from "../features/stories/storiesSlice";

const rootReducer = combineReducers({
	counter: counterReducer,
	stories: storiesReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
