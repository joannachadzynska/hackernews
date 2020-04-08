import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
};

const rootReducer = combineReducers({
	counter: counterReducer,
	auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
