import React from "react";
import { InputWithLabel, Button } from "../shared";

export interface PasswordForgetFormProps {
	firebase: any;
}

const initialState = {
	email: "",
	error: null
};

const PasswordForgetForm: React.SFC<PasswordForgetFormProps> = ({
	firebase
}) => {
	const [state, setState] = React.useState(initialState);
	const { email, error } = state;

	const isInvalid = email === "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			await firebase.doPasswordReset(email);
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
				onInputChange={handleChange}
				placeholder='Email Address'>
				Email
			</InputWithLabel>

			<Button disabled={isInvalid}>Reset My Password</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default PasswordForgetForm;
