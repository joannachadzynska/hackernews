import React, { useState, useContext } from "react";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import { InputWithLabel, Button } from "../shared";

export interface MessagesFormProps {}

const MessagesForm: React.SFC<MessagesFormProps> = () => {
	const firebase = useContext(FirebaseContext);
	const authUser: any = useContext(AuthUserContext);
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
		firebase
			.messages()
			.doc()
			.set({
				text: state.text,
				userId: authUser.uid,
				createdAt: date
			})
			.then((msg: any) => {
				console.log("success");
			})
			.catch((err: any) => {
				console.log(`error: ${err.message}`);
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
