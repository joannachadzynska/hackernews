import {
	configureStore,
	ThunkAction,
	Action,
	getDefaultMiddleware
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { reduxBatch } from "@manaflair/redux-batch";
import rootReducer from "./rootReducer";

const middleware = [...getDefaultMiddleware(), logger];
const store = configureStore({
	reducer: rootReducer,
	middleware,
	devTools: process.env.NODE_ENV !== "production",
	enhancers: [reduxBatch]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
