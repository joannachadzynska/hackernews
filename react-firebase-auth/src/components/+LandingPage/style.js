import styled from "styled-components";

export const StyledLandingPage = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	height: 100%;
`;

export const Title = styled.h1`
	font-size: 3em;
	font-weight: 700;
	margin-bottom: 0.5em;
`;

export const Subtitle = styled.p`
	font-weight: 300;
	text-transform: uppercase;
	margin-bottom: 1rem;
`;

export const MainButton = styled.button`
	margin: 0.5em 0.5em 0.5em 0;
	padding: 12px 2em;
	background-color: #e50914;
	cursor: pointer;
	border-radius: 2px;
	text-align: center;
	border: 0;
	transition: all ease 0.3s;

	&:hover {
		background-color: #e53935;
	}

	a {
		color: white;
		text-decoration: none;
		letter-spacing: 1.9px;
		font-weight: 600;
		font-size: 1.2em;
		text-transform: uppercase;
	}
`;
