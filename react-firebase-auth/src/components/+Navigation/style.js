import styled from "styled-components";

export const StyledNav = styled.nav`
	background-color: rgba(0, 0, 0, 0.774);
`;

export const StyledNavList = styled.ul`
	list-style-type: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;
	height: 10vh;

	li {
		position: relative;
		display: inline-block;
		a {
			position: relative;
			text-decoration: none;
			text-transform: uppercase;
			transition: ease all 0.3s;
			margin: 1rem;
			display: block;
			padding: 10px 0;

			&::after {
				content: "";
				position: absolute;
				width: 100%;
				height: 3px;
				bottom: 0;
				right: 0;
				background-color: #ffcc00;
				transform: scaleX(0);
				transform-origin: bottom right;
				transition: transform 0.3s;
			}

			&::before {
				content: "";
				position: absolute;
				width: 100%;
				height: 3px;
				top: 0;
				left: 0;
				background-color: #ffcc00;
				transform: scaleX(0);
				transform-origin: top left;

				transition: transform 0.3s;
			}

			&:hover {
				color: #ffcc00;
				letter-spacing: 1px;
			}

			&:hover::before {
				transform-origin: top right;
				transform: scaleX(1);
			}

			&:hover::after {
				transform-origin: bottom left;
				transform: scaleX(1);
			}
		}
	}

	.active {
		color: #ffcc00;
	}
`;

export const StyledLogo = styled.img`
	width: 167px;

	vertical-align: middle;
`;
