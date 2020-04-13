import styled from "styled-components";

export const StyledTodoList = styled.ul`
	list-style-type: none;
	background: linear-gradient(
		to right,
		rgba(0, 0, 0, 0.75),
		rgba(0, 0, 0, 0.9)
	);
	li {
		cursor: pointer;
		padding: 20px;
		transition: 0.3s ease;

		&:hover {
			background: linear-gradient(
				to right,
				rgba(148, 38, 38, 0.9),
				rgba(0, 0, 0, 0.9)
			);
		}
	}

	li:nth-child(odd) {
		background: linear-gradient(
			to right,
			rgba(97, 23, 23, 0.9),
			rgba(0, 0, 0, 0.9)
		);
		transition: 0.3s ease;

		&:hover {
			background: linear-gradient(
				to right,
				rgba(148, 38, 38, 0.9),
				rgba(0, 0, 0, 0.9)
			);
		}
	}
`;
