import React, { useState } from "react";

import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { Button, InputWithLabel } from "../shared";
import {
	doCreateUserWithEmailAndPassword,
	createUserProfileDocument,
	doSendEmailVerification
} from "../+Firebase/firebase.utils";

export interface SignUpFormProps {
	history: any;
	errorCodes: any;
}

const SignUpForm: React.SFC<SignUpFormProps> = ({ history, errorCodes }) => {
	const initialState = {
		displayName: "",
		email: "",
		passwordOne: "",
		passwordTwo: "",
		isAdmin: false,
		error: ""
	};
	const [state, setState] = useState(initialState);
	const {
		displayName,
		email,
		passwordOne,
		passwordTwo,
		error,
		isAdmin
	} = state;

	const isInvalid =
		passwordOne !== passwordTwo ||
		passwordOne === "" ||
		email === "" ||
		displayName === "";

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const roles: any = [];

		if (isAdmin) {
			roles.push(ROLES.ADMIN);
		}
		try {
			const { user } = await doCreateUserWithEmailAndPassword(
				email,
				passwordOne
			);

			await createUserProfileDocument(user, {
				displayName,
				email,
				roles
			});

			doSendEmailVerification();
			setState({ ...initialState });
			history.push(ROUTES.HOME);
		} catch (error) {
			if (error.code === "ERROR_CODE_ACCOUNT_EXISTS") {
				error.message = errorCodes.ERROR_CODE_ACCOUNT_EXISTS;
			}
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

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setState({
			...state,
			[name]: checked
		});
	};

	return (
		<form onSubmit={handleSubmit} noValidate>
			<InputWithLabel
				type='text'
				value={displayName}
				id='display name'
				name='displayName'
				onInputChange={handleChange}>
				Username
			</InputWithLabel>

			<InputWithLabel
				type='email'
				value={email}
				id='email'
				name='email'
				onInputChange={handleChange}>
				Email Address
			</InputWithLabel>

			<InputWithLabel
				type='password'
				value={passwordOne}
				id='password one'
				name='passwordOne'
				onInputChange={handleChange}>
				Password
			</InputWithLabel>

			<InputWithLabel
				type='password'
				value={passwordTwo}
				id='password two'
				name='passwordTwo'
				onInputChange={handleChange}>
				Confirm Password
			</InputWithLabel>

			<InputWithLabel
				type='checkbox'
				name='isAdmin'
				onInputChange={handleChangeCheckbox}
				id='isAdmin'
				checked={isAdmin}>
				Admin
			</InputWithLabel>

			<Button type='submit' disabled={isInvalid}>
				Sign Up
			</Button>

			{error && <p>{error}</p>}
		</form>
	);
};

// const SignUpFormBase = withRouter(SignUpForm);

export default SignUpForm;
