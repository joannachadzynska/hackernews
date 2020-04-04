import * as React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { StyledNavList, StyledLogo } from "./style";
import { Button } from "../shared";
import logo from "../../assets/logo.svg";

export interface NavigationNonAuthProps {}

const NavigationNonAuth: React.SFC<NavigationNonAuthProps> = () => {
	return (
		<StyledNavList className='wrapper'>
			<Link to={ROUTES.LANDING}>
				<StyledLogo src={logo} alt='fireboard logo' />
			</Link>

			<Button>
				<Link to={ROUTES.SIGN_IN}>Sign In</Link>
			</Button>
		</StyledNavList>
	);
};

export default NavigationNonAuth;
