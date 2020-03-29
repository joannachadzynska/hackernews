import React, { useContext } from "react";
import { FirebaseContext } from "../+Firebase";

import SignUpForm from "./SignUpForm";

export interface SignUpProps {
	history: any;
}

const SignUp: React.SFC<SignUpProps> = ({ history }) => {
	const firebase = useContext(FirebaseContext);
	return (
		<div>
			<h1>Sign Up</h1>
			<SignUpForm firebase={firebase} history={history} />
		</div>
	);
};

export default SignUp;
