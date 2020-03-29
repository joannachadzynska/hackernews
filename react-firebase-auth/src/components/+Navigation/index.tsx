import React from "react";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";
import { AuthUserContext } from "../+Session";

export interface NavigationProps {
	authUser: any;
}

const Navigation: React.SFC<NavigationProps> = ({ authUser }) => {
	return (
		<div>
			<AuthUserContext.Consumer>
				{(authUser) => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
			</AuthUserContext.Consumer>
		</div>
	);
};

export default Navigation;
