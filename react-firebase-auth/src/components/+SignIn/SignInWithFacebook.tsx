import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import facebook from "../../assets/facebook3.svg";
import { StyledButtonWithIcon } from "./style";

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
			<StyledButtonWithIcon type='submit'>
				<img src={facebook} alt='Facebook Icon' />
			</StyledButtonWithIcon>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithFacebook;
