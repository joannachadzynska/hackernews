import React, { useState } from "react";
import { Button, InputWithLabel } from "../shared";

export interface MessageItemProps {
	message: any;
	onRemoveMessage: any;
	onEditMessage: any;
}

const MessageItem: React.SFC<MessageItemProps> = ({
	message,
	onRemoveMessage,
	onEditMessage
}) => {
	const [state, setState] = useState({
		editMode: false,
		editText: message.data.text
	});

	const { editMode, editText } = state;

	const toggleEditMode = () => {
		setState({
			editMode: !editMode,
			editText: message.data.text
		});
	};

	const onChangeEditText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			editText: e.target.value
		});
	};

	const onSaveEditText = () => {
		onEditMessage(message, editText);

		setState({
			...state,
			editMode: false
		});
	};
	return (
		<li>
			{editMode ? (
				<InputWithLabel
					value={editText}
					name='edit'
					id={editText}
					onInputChange={onChangeEditText}
				/>
			) : (
				<span>
					{/* <strong>{message.uid}</strong>  */}
					{message.data.text}
					{message.data.editedAt && <span>(Edited)</span>}
				</span>
			)}

			{editMode ? (
				<span>
					<Button onClick={onSaveEditText}>Save</Button>
					<Button onClick={toggleEditMode}>Reset</Button>
				</span>
			) : (
				<span>
					<Button onClick={toggleEditMode}>Edit</Button>
					<Button onClick={() => onRemoveMessage(message.uid)}>Delete</Button>
				</span>
			)}
			{/* <Button onClick={() => onRemoveMessage(message.uid)}>Delete</Button> */}
		</li>
	);
};

export default MessageItem;
