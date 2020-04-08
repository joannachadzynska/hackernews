import React, { useState } from "react";
import * as ROUTES from "../../constants/routes";

import gmail from "../../assets/gmail.svg";
import { StyledButtonWithIcon } from "./style";
import {
	doSignInWithGoogle,
	createUserProfileDocument
} from "../+Firebase/firebase.utils";

export interface SignInWithGoogleProps {
	history: any;
	errorCodes: any;
}

const SignInWithGoogle: React.SFC<SignInWithGoogleProps> = ({
	history,
	errorCodes
}) => {
	const [error, setError] = useState(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		doSignInWithGoogle()
			.then((user: any) => {
				createUserProfileDocument(user.user, { roles: [] });
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
			<StyledButtonWithIcon type='submit'>
				<img src={gmail} alt='Gmail icon' />
			</StyledButtonWithIcon>
			{error && <p>{error}</p>}
		</form>
	);
};

export default SignInWithGoogle;
