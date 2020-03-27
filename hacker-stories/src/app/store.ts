import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
	reducer: rootReducer
});

// if (process.env.NODE_ENV === "development" && module.hot) {
// 	module.hot.accept("./rootReducer", () => {
// 		const newRootReducer = require("./rootReducer").default;
// 		store.replaceReducer(newRootReducer);
// 	});
// }

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
