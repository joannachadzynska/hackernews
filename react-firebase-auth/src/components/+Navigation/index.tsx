import React from "react";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";
import { StyledNav } from "./style";

export interface NavigationProps {
	authUser: any;
}

const Navigation: React.SFC<NavigationProps> = ({ authUser }) => {
	return (
		<StyledNav>
			{authUser ? (
				<NavigationAuth authUser={authUser} />
			) : (
				<NavigationNonAuth />
			)}
		</StyledNav>
	);
};

export default Navigation;
