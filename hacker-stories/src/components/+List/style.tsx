import styled from "styled-components";

const StyledItem = styled.div`
	display: flex;
	align-items: center;
	padding-bottom: 5px;
`;

const StyledColumn = styled.span<{ width: string }>`
	padding: 0 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	a {
		color: inherit;
	}

	width: ${(props) => props.width};
`;

export { StyledItem, StyledColumn };
