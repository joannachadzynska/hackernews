import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export interface SignInLinkProps {}

const SignInLink: React.SFC<SignInLinkProps> = () => {
	return (
		<p>
			Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
		</p>
	);
};

export default SignInLink;
