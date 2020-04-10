import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterReducer from "../features/counter/counterSlice";
import authReducer from "../features/auth/authSlice";
import usersReducer from "../features/users/usersSlice";
import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["auth"],
};

const rootReducer = combineReducers({
	counter: counterReducer,
	auth: authReducer,
	users: usersReducer,
	todos: todosReducer,
	filters: filtersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default persistReducer(persistConfig, rootReducer);
