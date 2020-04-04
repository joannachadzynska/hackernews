import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";
import SignOut from "../+SignOut";
import { StyledNavList, StyledLogo } from "./style";
import logo from "../../assets/logo.svg";

export interface NavigationAuthProps {
	authUser: any;
}

const NavigationAuth: React.SFC<NavigationAuthProps> = ({ authUser }) => {
	return (
		<StyledNavList className='wrapper'>
			<Link to={ROUTES.LANDING}>
				<StyledLogo src={logo} alt='fireboard logo' />
			</Link>
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
