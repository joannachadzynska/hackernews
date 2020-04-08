import React, { useState } from "react";
import { useSelector } from "react-redux";
import { InputWithLabel, Button } from "../shared";
import { messagesFirestore } from "../+Firebase/firebase.utils";

export interface MessagesFormProps {}

const MessagesForm: React.SFC<MessagesFormProps> = () => {
	const authUser: any = useSelector((state: any) => state.auth.currentUser);
	const [state, setState] = useState({
		text: "",
		loading: false,
		messages: [],
		limit: 5
	});

	const { text } = state;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setState({
			...state,
			text: e.target.value
		});
	};

	const onCreateMessage = (
		e: React.FormEvent<HTMLFormElement>,
		authUser: any
	) => {
		e.preventDefault();
		const date = new Date();

		messagesFirestore()
			.doc()
			.set({
				text: state.text,
				userId: authUser.uid,
				createdAt: date
			});

		setState({ ...state, text: "" });
	};

	return (
		<form onSubmit={(e) => onCreateMessage(e, authUser)}>
			<InputWithLabel
				type='text'
				name={text}
				value={text}
				id={text}
				onInputChange={handleChange}>
				Text
			</InputWithLabel>
			<Button type='submit'>Send</Button>
		</form>
	);
};

export default MessagesForm;
