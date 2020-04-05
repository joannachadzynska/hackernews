import styled from "styled-components";

export const StyledList = styled.table`
	border-collapse: collapse;
	width: 100%;

	thead {
		background: #212b5de0;
		tr {
			height: 5vh;
		}
	}

	tbody {
		tr {
			background: #1e2961;
			height: 8vh;
			transition: ease all 0.2s;

			&:hover {
				background: #0c1023;
			}

			td {
				padding-left: 1rem;
			}
		}

		tr:nth-of-type(odd) {
			background: #1a2f40;

			&:hover {
				background: #0c1023;
			}
		}
	}
`;

export const StyledDetails = styled.div`
	border-radius: 5px;
	background: linear-gradient(145deg, #000000, #323232);
	box-shadow: 17px 14px 23px -1px #000000;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	padding: 1.5rem;
	width: 70%;

	span {
		display: flex;
		justify-content: space-between;
		line-height: 2;
	}
`;
