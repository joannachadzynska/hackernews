import styled from "styled-components";

export const StyledChatList = styled.ul`
	list-style-type: none;

	li {
		background: #000000eb;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		padding: 1rem;
		width: 100%;

		i {
			font-size: 0.875rem;
		}
	}
`;

export const StyledButtonWithIcon = styled.button`
	background: none;
	border: none;
	cursor: pointer;

	img {
		width: 25px;
		height: 25px;
		filter: invert(27%) sepia(31%) saturate(3324%) hue-rotate(336deg)
			brightness(81%) contrast(105%);
		transition: 0.3s ease;

		&:hover {
			filter: invert(23%) sepia(97%) saturate(2337%) hue-rotate(342deg)
				brightness(84%) contrast(99%);
			transform: scale(1.1);
		}
	}
`;

export const ChatUserTitle = styled.div`
	background: #1c5896e6;
`;

export const ChatMessage = styled.div``;

export const ChatButtons = styled.div`
	display: flex;
	align-self: flex-end;
`;
