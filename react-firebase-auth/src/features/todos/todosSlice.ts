import { createSlice } from "@reduxjs/toolkit";
import uid from "uid";

const initialState: any = {
	todos: [],
};

type Payload = {
	id: string;
	text: string;
};

export const todosSlice = createSlice({
	name: "todos",
	initialState: [],
	reducers: {
		addTodo: {
			reducer(state: any, action) {
				const { id, text } = action.payload;
				state.push({ id, text, completed: false });
			},

			prepare(text: string) {
				return { payload: { text, id: uid() }, meta: {}, error: {} };
			},
		},
		toggleTodo(state, action) {
			const todo: any = state.find((todo: any) => todo.id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
	},
});

export const { addTodo, toggleTodo } = todosSlice.actions;

export default todosSlice.reducer;
