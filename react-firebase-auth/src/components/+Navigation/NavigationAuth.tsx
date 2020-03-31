import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOut from "../+SignOut";
import { StyledNavList } from "./style";

export interface NavigationAuthProps {
	authUser: any;
}

const NavigationAuth: React.SFC<NavigationAuthProps> = ({ authUser }) => {
	return (
		<StyledNavList>
			<li>
				<Link to={ROUTES.LANDING}>Landing</Link>
			</li>
			<li>
				<Link to={ROUTES.HOME}>Home</Link>
			</li>
			<li>
				<Link to={ROUTES.ACCOUNT}>Account</Link>
			</li>

			{authUser.roles !== undefined && !!authUser.roles[ROLES.ADMIN] && (
				<li>
					<Link to={ROUTES.ADMIN}>Admin</Link>
				</li>
			)}

			<li>
				<SignOut />
			</li>
		</StyledNavList>
	);
};

export default NavigationAuth;
