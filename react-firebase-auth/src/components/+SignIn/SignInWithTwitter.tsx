import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface SignInWithTwitterProps {
	firebase: any;
	history: any;
}

const SignInWithTwitter: React.SFC<SignInWithTwitterProps> = ({
	firebase,
	history
}) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		firebase
			.doSignInWithTwitter()
			.then((user: any) => {
				const displayName = user.additionalUserInfo.username;
				const email = user.additionalUserInfo.profile.name;
				firebase.createUserProfileDocument(user.user, {
					roles: {},
					displayName,
					email
				});
				setError(null);
				history.push(ROUTES.HOME);
			})
			.catch((error: any) => {
				setError(error.message);
			});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Button type='submit'>Sign In with Twitter</Button>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithTwitter;
