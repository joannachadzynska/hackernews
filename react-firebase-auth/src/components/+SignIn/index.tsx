import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import SignInForm from "./SignInForm";
import SignUpLink from "../+SignUp/SignUpLink";
import PasswordForgetLink from "../+PasswordForget/PasswordForgetLink";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";
import SignInWithTwitter from "./SignInWithTwitter";

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
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<h1>Sign In</h1>
			<SignInForm firebase={firebase} history={history} />
			<SignInWithGoogle
				firebase={firebase}
				history={history}
				errorCodes={errorCodes}
			/>
			<SignInWithFacebook firebase={firebase} history={history} />
			<SignInWithTwitter firebase={firebase} history={history} />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

export default SignIn;
