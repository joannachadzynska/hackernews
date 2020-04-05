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
