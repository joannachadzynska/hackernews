import styled from "styled-components";

export const StyledButton = styled.button`
	background: transparent;
	border: 1px solid #171212;
	padding: 5px;
	cursor: pointer;
	transition: all 0.1s ease-in;
	-webkit-transition: all 0.1s ease-in;
	-moz-transition: all 0.1s ease-in;
	-ms-transition: all 0.1s ease-in;
	-o-transition: all 0.1s ease-in;

	&:hover {
		background: #171212;
		color: #ffffff;
	}
	&:hover > svg > g {
		fill: #ffffff;
		stroke: #ffffff;
	}
`;

export const StyledButtonSmall = styled(StyledButton)`
	padding: 5px;
`;

export const StyledButtonLarge = styled(StyledButton)`
	padding: 10px;
`;
