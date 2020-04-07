import React, { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import { convertMessageDate } from "../../helpers/utils";
import { InputWithLabel } from "../shared";
import {
	StyledButtonWithIcon,
	ChatUserTitle,
	ChatMessage,
	ChatButtons
} from "./style";
import edit from "../../assets/edit.svg";
import deleteIcon from "../../assets/delete.svg";
import save from "../../assets/floppy-disk.svg";
import reset from "../../assets/reset.svg";

export interface MessageItemProps {
	message: any;
	onRemoveMessage: any;
	onEditMessage: any;
	authUser: any;
}

const MessageItem: React.SFC<MessageItemProps> = ({
	message,
	onRemoveMessage,
	onEditMessage,
	authUser
}) => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({
		editMode: false,
		editText: message.data.text
	});
	const [otherUser, setOtherUser] = useState({
		email: "",
		displayName: ""
	});

	useEffect(() => {
		const otherChatUser = firebase
			.userFirestore(message.data.userId)
			.onSnapshot((snapshot: any) => {
				if (authUser.id !== message.data.userId) {
					setOtherUser({
						displayName: snapshot.data().displayName,
						email: snapshot.data().email
					});
				} else {
					setOtherUser({
						email: "",
						displayName: ""
					});
				}
			});

		return () => otherChatUser();
	}, []);

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
				<div style={{ width: "100%" }}>
					<ChatUserTitle>
						{authUser.uid === message.data.userId ? (
							<strong>Me</strong>
						) : (
							<strong>{otherUser.displayName}</strong>
						)}
					</ChatUserTitle>
					<ChatMessage>
						<span> {message.data.text}</span>
					</ChatMessage>

					<div>
						<small>{convertMessageDate(message.data.createdAt?.seconds)}</small>
						&nbsp;
						{message.data.editedAt && (
							<i>
								(Edited: {convertMessageDate(message.data.editedAt?.seconds)})
							</i>
						)}
					</div>
				</div>
			)}

			{authUser.uid === message.data.userId && (
				<ChatButtons>
					{editMode ? (
						<>
							<StyledButtonWithIcon onClick={onSaveEditText}>
								<img src={save} alt='floppy disc icon' />
							</StyledButtonWithIcon>
							&nbsp;
							<StyledButtonWithIcon onClick={toggleEditMode}>
								<img src={reset} alt='reset icon' />
							</StyledButtonWithIcon>
						</>
					) : (
						<>
							<StyledButtonWithIcon onClick={toggleEditMode}>
								<img src={edit} alt='edit icon' />
							</StyledButtonWithIcon>
							&nbsp;
							<StyledButtonWithIcon
								onClick={() => onRemoveMessage(message.uid)}>
								<img src={deleteIcon} alt='delete icon trash' />
							</StyledButtonWithIcon>
						</>
					)}
				</ChatButtons>
			)}
		</li>
	);
};

export default MessageItem;
