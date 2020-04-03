import React, { useState } from "react";
import { Button, InputWithLabel } from "../shared";

export interface DefaultLoginToggleProps {
	onlyOneLeft: boolean;
	isEnabled: boolean;
	signInMethod: any;
	onLink: any;
	onUnLink: any;
}

const DefaultLoginToggle: React.SFC<DefaultLoginToggleProps> = ({
	onlyOneLeft,
	isEnabled,
	signInMethod,
	onLink,
	onUnLink
}) => {
	const [state, setState] = useState({
		passwordOne: "",
		passwordTwo: ""
	});

	const { passwordOne, passwordTwo } = state;

	const isInvalid = passwordOne !== passwordTwo || passwordOne === "";

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onLink(passwordOne);
		setState({
			passwordOne: "",
			passwordTwo: ""
		});
	};

	return isEnabled ? (
		<Button onClick={() => onUnLink(signInMethod.id)} disabled={onlyOneLeft}>
			Deactivate {signInMethod.id}
		</Button>
	) : (
		<form onSubmit={handleSubmit}>
			<InputWithLabel
				name='passwordOne'
				id={passwordOne}
				value={passwordOne}
				type='password'
				placeholder='New Password'
				onInputChange={handleChange}>
				New Password
			</InputWithLabel>

			<InputWithLabel
				name='passwordTwo'
				id={passwordTwo}
				value={passwordTwo}
				type='password'
				placeholder='Confirm New Password'
				onInputChange={handleChange}>
				Confirm New Password
			</InputWithLabel>
			<Button type='submit' disabled={isInvalid}>
				Link {signInMethod.id}
			</Button>
		</form>
	);
};

export default DefaultLoginToggle;
