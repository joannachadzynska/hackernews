import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import SignInForm from "./SignInForm";
import SignUpLink from "../+SignUp/SignUpLink";
import PasswordForgetLink from "../+PasswordForget/PasswordForgetLink";
import SignInWithGoogle from "./SignInWithGoogle";
import SignInWithFacebook from "./SignInWithFacebook";

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<h1>Sign In</h1>
			<SignInForm firebase={firebase} history={history} />
			<SignInWithGoogle firebase={firebase} history={history} />
			<SignInWithFacebook firebase={firebase} history={history} />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

export default SignIn;
