import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";

import SignUpForm from "./SignUpForm";
import SignInLink from "../+SignIn/SignInLink";

export interface SignUpProps {}

const errorCodes = {
	ERROR_MSG_ACCOUNT_EXISTS: `
	An account with this E-Mail address already exists.
	Try to login with this account instead. If you think the
	account is already used from one of the social logins, try
	to sign-in with one of them. Afterward, associate your accounts
	on your personal account page.
	
	`,
	ERROR_CODE_ACCOUNT_EXISTS: "'auth/email-already-in-use"
};

const SignUp: React.SFC<SignUpProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm
				firebase={firebase}
				history={history}
				errorCodes={errorCodes}
			/>
			<SignInLink />
		</div>
	);
};

export default SignUp;
