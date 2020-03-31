import styled from "styled-components";

export const StyledList = styled.ul`
	list-style-type: none;

	li {
		border: 1px solid black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 5vh;

		&:hover {
			background-color: lightblue;
		}
	}
`;
