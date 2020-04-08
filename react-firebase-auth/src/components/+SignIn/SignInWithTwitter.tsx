import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";
import twitter from "../../assets/twitter2.svg";
import { StyledButtonWithIcon } from "./style";
import {
	doSignInWithTwitter,
	createUserProfileDocument
} from "../+Firebase/firebase.utils";

export interface SignInWithTwitterProps {
	history: any;
}

const SignInWithTwitter: React.SFC<SignInWithTwitterProps> = ({ history }) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		doSignInWithTwitter()
			.then((user: any) => {
				const displayName = user.additionalUserInfo.username;
				const email = user.additionalUserInfo.profile.name;
				createUserProfileDocument(user.user, {
					roles: [],
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
			<StyledButtonWithIcon type='submit'>
				<img src={twitter} alt='Twitter icon' />
			</StyledButtonWithIcon>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithTwitter;
