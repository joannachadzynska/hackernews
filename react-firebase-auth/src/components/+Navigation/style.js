import styled from "styled-components";

export const StyledNavList = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 5vh;

	li a {
		text-decoration: none;
		text-transform: uppercase;

		&:hover {
			color: royalblue;
		}
	}
`;
