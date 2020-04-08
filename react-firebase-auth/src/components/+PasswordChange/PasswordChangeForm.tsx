import React, { useState } from "react";
import { doPasswordUpdate } from "../+Firebase/firebase.utils";
import { InputWithLabel, Button } from "../shared";

export interface PasswordChangeFormProps {}

const initialState = {
	passwordOne: "",
	passwordTwo: "",
	error: null
};

const PasswordChangeForm: React.SFC<PasswordChangeFormProps> = () => {
	const [state, setState] = useState(initialState);
	const { passwordOne, passwordTwo, error } = state;

	const isInvalid = passwordOne !== passwordTwo || passwordTwo === "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await doPasswordUpdate(passwordOne);
			setState({ ...initialState });
		} catch (error) {
			setState({
				...state,
				error: error.message
			});
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value
		});
	};
	return (
		<form onSubmit={handleSubmit}>
			<InputWithLabel
				type='password'
				name='passwordOne'
				id='password One'
				value={passwordOne}
				onInputChange={handleChange}>
				New Password
			</InputWithLabel>

			<InputWithLabel
				type='password'
				name='passwordTwo'
				id='password Two'
				value={passwordTwo}
				onInputChange={handleChange}>
				Confirm New Password
			</InputWithLabel>

			<Button type='submit' disabled={isInvalid}>
				Reset My Password
			</Button>

			{error && <p>{error}</p>}
		</form>
	);
};

export default PasswordChangeForm;
