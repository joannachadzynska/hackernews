import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"]
};

const rootReducer = combineReducers({
	counter: counterReducer,
	auth: authReducer,
	users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
