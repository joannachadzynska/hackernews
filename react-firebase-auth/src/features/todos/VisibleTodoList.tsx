import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTodo } from "./todosSlice";
import Todo from "./Todo";
import { VisibilityFilters } from "../filters/filtersSlice";
import { StyledTodoList } from "./style";
export interface TodoListProps {}

const VisibleTodoList: React.SFC<TodoListProps> = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state: any) => state.todos);
	const filters = useSelector((state: any) => state.filters);

	const selectVisibleTodos = (todos: any) => {
		switch (filters) {
			case VisibilityFilters.SHOW_ALL:
				return todos;
			case VisibilityFilters.SHOW_COMPLETED:
				return todos.filter((t: any) => t.completed);
			case VisibilityFilters.SHOW_ACTIVE:
				return todos.filter((t: any) => !t.completed);
			default:
				throw new Error(`Unknown filter: ${filters}`);
		}
	};

	const filteredTodos = selectVisibleTodos(todos);

	return (
		<div>
			<StyledTodoList>
				{todos &&
					filteredTodos.map((todo: any) => (
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

export default VisibleTodoList;
