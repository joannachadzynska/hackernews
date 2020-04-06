import React from "react";
import MessageItem from "./MessageItem";

export interface MessagesListProps {
	messages: any;
	onRemoveMessage: any;
}

const MessagesList: React.SFC<MessagesListProps> = ({
	messages,
	onRemoveMessage
}) => {
	return (
		<ul>
			{messages.map((message: any) => (
				<MessageItem
					key={message.uid}
					message={message}
					onRemoveMessage={onRemoveMessage}
				/>
			))}
		</ul>
	);
};

export default MessagesList;
