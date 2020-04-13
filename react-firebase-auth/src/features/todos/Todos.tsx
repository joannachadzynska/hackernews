import React from "react";
import AddTodo from "./AddTodo";
import VisibleTodoList from "./VisibleTodoList";
import Filter from "../filters/Filter";

export interface TodosProps {}

const Todos: React.SFC<TodosProps> = () => {
	return (
		<div>
			<h1>todos</h1>
			<AddTodo />
			<br />
			<VisibleTodoList />
			<Filter />
		</div>
	);
};

export default Todos;
