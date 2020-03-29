import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";

import SignUpForm from "./SignUpForm";
import SignInLink from "../+SignIn/SignInLink";

export interface SignUpProps {}

const SignUp: React.SFC<SignUpProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm firebase={firebase} history={history} />
			<SignInLink />
		</div>
	);
};

export default SignUp;
