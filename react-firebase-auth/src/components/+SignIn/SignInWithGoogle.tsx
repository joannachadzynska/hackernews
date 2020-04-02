import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface SignInWithGoogleProps {
	firebase: any;
	history: any;
	errorCodes: any;
}

const SignInWithGoogle: React.SFC<SignInWithGoogleProps> = ({
	firebase,
	history,
	errorCodes
}) => {
	const [error, setError] = useState(null);
	console.log(errorCodes.ERROR_CODE_ACCOUNT_EXISTS);

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
				if (error.code === "ERROR_CODE_ACCOUNT_EXISTS") {
					error.message = errorCodes.ERROR_MSG_ACCOUNT_EXISTS;
				}
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
