import React from "react";
import { FirebaseContext } from "../+Firebase";

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
	return (
		<FirebaseContext.Consumer>
			{(firebase) => {
				return (
					<div>
						<h1>Sign In</h1>
					</div>
				);
			}}
		</FirebaseContext.Consumer>
	);
};

export default SignIn;
