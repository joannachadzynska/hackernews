import React from "react";
import { useHistory } from "react-router-dom";

import SignInForm from "./SignInForm";
import SignUpLink from "../+SignUp/SignUpLink";
import PasswordForgetLink from "../+PasswordForget/PasswordForgetLink";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithTwitter from "./SignInWithTwitter";
import { Title } from "../styles";
import { SocialSignInLinks } from "./style";

export interface SignInProps {}

const errorCodes = {
	ERROR_MSG_ACCOUNT_EXISTS: `
	An account with an E-Mail address to
	this social account already exists. Try to login from
	this account instead and associate your social accounts on
	your personal account page.
	`,
	ERROR_CODE_ACCOUNT_EXISTS: "auth/account-exists-with-different-credential"
};

const SignIn: React.SFC<SignInProps> = () => {
	const history = useHistory();
	return (
		<div>
			<Title>Sign In</Title>
			<SignInForm history={history} />
			<br />
			<hr />
			<p>Or sign in with: </p>
			<br />
			<SocialSignInLinks>
				<SignInWithGoogle history={history} errorCodes={errorCodes} />
				<SignInWithFacebook history={history} />
				<SignInWithTwitter history={history} />
			</SocialSignInLinks>
			<br />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

export default SignIn;
