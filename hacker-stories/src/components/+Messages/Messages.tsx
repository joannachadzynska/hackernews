import * as React from "react";
import { MessagesProps } from "./types";

const Messages: React.SFC<MessagesProps> = ({ message }) => {
	return (
		<div>
			<h1>messages</h1>
		</div>
	);
};

export default Messages;
