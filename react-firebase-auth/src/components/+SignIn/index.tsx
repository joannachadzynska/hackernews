import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import SignInForm from "./SignInForm";
import SignUpLink from "../+SignUp/SignUpLink";
import PasswordForgetLink from "../+PasswordForget/PasswordForgetLink";

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<h1>Sign In</h1>
			<SignInForm firebase={firebase} history={history} />
			<PasswordForgetLink />
			<SignUpLink />
		</div>
	);
};

export default SignIn;
