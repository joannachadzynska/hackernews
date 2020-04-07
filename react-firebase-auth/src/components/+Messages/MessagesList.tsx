import React from "react";
import MessageItem from "./MessageItem";
import { StyledChatList } from "./style";

export interface MessagesListProps {
	messages: any;
	onRemoveMessage: any;
	onEditMessage: any;
	authUser: any;
}

const MessagesList: React.SFC<MessagesListProps> = ({
	messages,
	onRemoveMessage,
	onEditMessage,
	authUser
}) => {
	return (
		<StyledChatList>
			{messages.map((message: any) => (
				<MessageItem
					key={message.uid}
					message={message}
					onRemoveMessage={onRemoveMessage}
					onEditMessage={onEditMessage}
					authUser={authUser}
				/>
			))}
		</StyledChatList>
	);
};

export default MessagesList;
