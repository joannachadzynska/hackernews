import React from "react";
import { Button } from "../shared";

export interface MessageItemProps {
	message: any;
	onRemoveMessage: any;
}

const MessageItem: React.SFC<MessageItemProps> = ({
	message,
	onRemoveMessage
}) => {
	return (
		<li>
			<strong>{message.uid}</strong> {message.data.text}
			<Button onClick={() => onRemoveMessage(message.uid)}>Delete</Button>
		</li>
	);
};

export default MessageItem;
