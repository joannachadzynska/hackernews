import React from "react";
import MessageItem from "./MessageItem";

export interface MessagesListProps {
	messages: any;
}

const MessagesList: React.SFC<MessagesListProps> = ({ messages }) => {
	return (
		<ul>
			{messages.map((message: any) => (
				<MessageItem key={message.uid} message={message} />
			))}
		</ul>
	);
};

export default MessagesList;
