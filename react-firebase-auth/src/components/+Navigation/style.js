import styled from "styled-components";

export const StyledNav = styled.nav`
	background-color: rgba(0, 0, 0, 0.774);
`;

export const StyledNavList = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 10vh;

	li a {
		text-decoration: none;
		text-transform: uppercase;

		&:hover {
			color: royalblue;
		}
	}
`;

export const StyledLogo = styled.img`
	width: 167px;

	vertical-align: middle;
`;
