import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
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
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<Title>Sign In</Title>
			<SignInForm firebase={firebase} history={history} />
			<br />
			<hr />
			<p>Or sign in with: </p>
			<br />
			<SocialSignInLinks>
				<SignInWithGoogle
					firebase={firebase}
					history={history}
					errorCodes={errorCodes}
				/>
				<SignInWithFacebook firebase={firebase} history={history} />
				<SignInWithTwitter firebase={firebase} history={history} />
			</SocialSignInLinks>
			<br />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

export default SignIn;
