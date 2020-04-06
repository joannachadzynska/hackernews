import React from "react";
import MessageItem from "./MessageItem";

export interface MessagesListProps {
	messages: any;
	onRemoveMessage: any;
	onEditMessage: any;
}

const MessagesList: React.SFC<MessagesListProps> = ({
	messages,
	onRemoveMessage,
	onEditMessage
}) => {
	return (
		<ul>
			{messages.map((message: any) => (
				<MessageItem
					key={message.uid}
					message={message}
					onRemoveMessage={onRemoveMessage}
					onEditMessage={onEditMessage}
				/>
			))}
		</ul>
	);
};

export default MessagesList;
