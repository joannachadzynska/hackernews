import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import { Button } from "../shared";

export interface SignInWithGoogleProps {
	firebase: any;
	history: any;
}

const SignInWithGoogle: React.SFC<SignInWithGoogleProps> = ({
	firebase,
	history
}) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		firebase
			.doSignInWithGoogle()
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
			<Button type='submit'>Sign In with Google</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithGoogle;
