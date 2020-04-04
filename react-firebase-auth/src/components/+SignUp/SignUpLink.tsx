import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface SignUpLinkProps {}

const SignUpLink: React.SFC<SignUpLinkProps> = () => {
	return (
		<p>
			Don't have an account?{" "}
			<Button>
				<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
			</Button>
		</p>
	);
};

export default SignUpLink;
