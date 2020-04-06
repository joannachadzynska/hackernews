import React from "react";

export interface MessageItemProps {
	message: any;
}

const MessageItem: React.SFC<MessageItemProps> = ({ message }) => {
	return (
		<li>
			<strong>{message.uid}</strong> {message.text}
		</li>
	);
};

export default MessageItem;
