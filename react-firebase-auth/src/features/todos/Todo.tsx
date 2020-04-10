import React from "react";

export interface TodoProps {
	key: any;
	todo: any;
	onClick: () => void;
}

const Todo: React.SFC<TodoProps> = ({ todo, onClick }) => {
	const { text, completed } = todo;

	return (
		<li
			onClick={onClick}
			style={{ textDecoration: completed ? "line-through" : "none" }}>
			{text}
		</li>
	);
};

export default Todo;
