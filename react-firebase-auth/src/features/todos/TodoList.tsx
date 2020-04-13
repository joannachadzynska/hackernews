import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "./todosSlice";
import Todo from "./Todo";
import { StyledTodoList } from "./style";
export interface TodoListProps {}

const TodoList: React.SFC<TodoListProps> = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state: any) => state.todos);

	return (
		<div>
			<StyledTodoList>
				{todos &&
					todos.map((todo: any) => (
						<Todo
							key={todo.id}
							todo={todo}
							onClick={() => dispatch(toggleTodo(todo.id))}
						/>
					))}
			</StyledTodoList>
		</div>
	);
};

export default TodoList;
