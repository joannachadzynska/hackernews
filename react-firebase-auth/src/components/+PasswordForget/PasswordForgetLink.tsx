import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export interface PasswordForgetLinkProps {}

const PasswordForgetLink: React.SFC<PasswordForgetLinkProps> = () => {
	return (
		<p>
			<Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
		</p>
	);
};

export default PasswordForgetLink;
