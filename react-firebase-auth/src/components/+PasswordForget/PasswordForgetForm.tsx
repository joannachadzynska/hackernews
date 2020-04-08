import React from "react";
import { InputWithLabel, Button } from "../shared";
import { doPasswordReset } from "../+Firebase/firebase.utils";
export interface PasswordForgetFormProps {}

const initialState = {
	email: "",
	error: null
};

const PasswordForgetForm: React.SFC<PasswordForgetFormProps> = () => {
	const [state, setState] = React.useState(initialState);
	const { email, error } = state;

	const isInvalid = email === "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await doPasswordReset(email);
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
				type='text'
				value={email}
				id={email}
				name='email'
				onInputChange={handleChange}>
				Email
			</InputWithLabel>

			<Button disabled={isInvalid} type='submit'>
				Reset My Password
			</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default PasswordForgetForm;
