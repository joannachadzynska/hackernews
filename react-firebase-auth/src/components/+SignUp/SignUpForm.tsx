import React, { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { Button, InputWithLabel } from "../shared";

export interface SignUpFormProps {
	firebase: any;
	history: any;
}

const initialState = {
	displayName: "",
	email: "",
	passwordOne: "",
	passwordTwo: "",
	isAdmin: false,
	error: ""
};

const SignUpForm: React.SFC<SignUpFormProps> = ({ firebase, history }) => {
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
		const roles: any = {};

		if (isAdmin) {
			roles[ROLES.ADMIN] = ROLES.ADMIN;
		}
		try {
			const { user } = await firebase.doCreateUserWithEmailAndPassword(
				email,
				passwordOne
			);
			await firebase.createUserProfileDocument(user, {
				displayName,
				email,
				roles
			});
			// await firebase.user(user.uid).set({
			// 	displayName,
			// 	email
			// });
			// await firebase.createProfileDocument(user, { displayName });
			setState({ ...initialState });
			history.push(ROUTES.HOME);
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

	const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setState({
			...state,
			[name]: checked
		});
	};

	useEffect(() => {
		setState({ ...initialState });
	}, []);

	return (
		<form onSubmit={handleSubmit} noValidate>
			<InputWithLabel
				type='text'
				value={displayName}
				id={displayName}
				name='displayName'
				onInputChange={handleChange}
				placeholder='Full Name'>
				Username
			</InputWithLabel>

			<InputWithLabel
				type='email'
				value={email}
				id={email}
				name='email'
				onInputChange={handleChange}
				placeholder='Email Address'>
				Email Address
			</InputWithLabel>

			<InputWithLabel
				type='password'
				value={passwordOne}
				id={passwordOne}
				name='passwordOne'
				onInputChange={handleChange}
				placeholder='Password'>
				Password
			</InputWithLabel>

			<InputWithLabel
				type='password'
				value={passwordTwo}
				id={passwordTwo}
				name='passwordTwo'
				onInputChange={handleChange}
				placeholder='Confirm Password'>
				Confirm Password
			</InputWithLabel>

			<label>
				Admin
				<input
					type='checkbox'
					name='isAdmin'
					checked={isAdmin}
					onChange={handleChangeCheckbox}
				/>
			</label>

			<Button type='submit' disabled={isInvalid}>
				Sign Up
			</Button>

			{error && <p>{error}</p>}
		</form>
	);
};

// const SignUpFormBase = withRouter(SignUpForm);

export default SignUpForm;
