import React from "react";
import { useSelector } from "react-redux";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";
import { StyledNav } from "./style";

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
	const currentUser = useSelector((state: any) => state.auth.currentUser);
	return (
		<StyledNav>
			{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}
		</StyledNav>
	);
};

export default Navigation;
