import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todosSlice";
import { InputWithLabel, Button } from "../../components/shared";

export interface AddTodoProps {}

const AddTodo: React.SFC<AddTodoProps> = () => {
	const dispatch = useDispatch();
	const [todoText, setTodoText] = useState("");
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setTodoText(e.target.value);

	const isInvalid = !todoText.trim();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isInvalid) return;
		dispatch(addTodo(todoText));
		setTodoText("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<InputWithLabel
				name='addTodo'
				id='add todo'
				value={todoText}
				onInputChange={handleChange}>
				Add Todo
			</InputWithLabel>
			<Button type='submit'>Add Todo</Button>
		</form>
	);
};

export default AddTodo;
