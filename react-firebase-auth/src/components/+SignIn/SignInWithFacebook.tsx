import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface SignInWithFacebookProps {
	firebase: any;
	history: any;
}

const SignInWithFacebook: React.SFC<SignInWithFacebookProps> = ({
	firebase,
	history
}) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		firebase
			.doSignInWithFacebook()
			.then((user: any) => {
				firebase.createUserProfileDocument(user.user, { roles: {} });
				setError(null);
				history.push(ROUTES.HOME);
			})
			.catch((error: any) => {
				setError(error.message);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button type='submit'>Sign In with Facebook</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithFacebook;
