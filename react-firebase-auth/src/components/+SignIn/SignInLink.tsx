import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface SignInLinkProps {}

const SignInLink: React.SFC<SignInLinkProps> = () => {
	return (
		<p>
			Already have an account?
			<Button>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</Button>
		</p>
	);
};

export default SignInLink;
