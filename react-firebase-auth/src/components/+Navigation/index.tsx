import React from "react";
import NavigationAuth from "./NavigationAuth";
import NavigationNonAuth from "./NavigationNonAuth";

export interface NavigationProps {
	authUser: any;
}

const Navigation: React.SFC<NavigationProps> = ({ authUser }) => {
	return (
		<div>
			{authUser ? (
				<NavigationAuth authUser={authUser} />
			) : (
				<NavigationNonAuth />
			)}
		</div>
	);
};

export default Navigation;
