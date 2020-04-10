import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "./todosSlice";
import Todo from "./Todo";

export interface TodoListProps {}

const TodoList: React.SFC<TodoListProps> = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state: any) => state.todos);

	return (
		<div>
			<ul>
				{todos &&
					todos.map((todo: any) => (
						<Todo
							key={todo.id}
							todo={todo}
							onClick={() => dispatch(toggleTodo(todo.id))}
						/>
					))}
			</ul>
		</div>
	);
};

export default TodoList;
