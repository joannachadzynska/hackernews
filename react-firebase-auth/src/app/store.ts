import {
	configureStore,
	ThunkAction,
	Action,
	getDefaultMiddleware
} from "@reduxjs/toolkit";
import logger from "redux-logger";
import { persistStore } from "redux-persist";
import { reduxBatch } from "@manaflair/redux-batch";
// import { getFirestore } from "redux-firestore";
// import { getFirebase } from "react-redux-firebase";
import rootReducer from "./rootReducer";

// const middleware = [...getDefaultMiddleware(), logger];

export const store = configureStore({
	reducer: rootReducer,
	middleware: [logger],
	devTools: process.env.NODE_ENV !== "production",
	enhancers: [reduxBatch]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);
