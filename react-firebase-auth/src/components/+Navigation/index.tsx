import React, { useContext } from "react";
import { AuthUserContext } from "../+Session";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";
import { StyledNav } from "./style";

export interface NavigationProps {}

const Navigation: React.SFC<NavigationProps> = () => {
	const authUser = useContext(AuthUserContext);
	return (
		<StyledNav>
			{authUser ? <NavigationAuth /> : <NavigationNonAuth />}
		</StyledNav>
	);
};

export default Navigation;
