import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export interface NavigationNonAuthProps {}

const NavigationNonAuth: React.SFC<NavigationNonAuthProps> = () => {
	return (
		<ul>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
			<li>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</li>
		</ul>
	);
};

export default NavigationNonAuth;
