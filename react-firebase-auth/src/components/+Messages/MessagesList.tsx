import React from "react";
import MessageItem from "./MessageItem";

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
		<ul>
			{messages.map((message: any) => (
				<MessageItem
					key={message.uid}
					message={message}
					onRemoveMessage={onRemoveMessage}
					onEditMessage={onEditMessage}
					authUser={authUser}
				/>
			))}
		</ul>
	);
};

export default MessagesList;
