import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export interface UserProps {
	user: any;
	key?: any;
}

const User: React.SFC<UserProps> = ({ user }) => {
	return (
		<li>
			<span style={{ width: "40%" }}>
				<strong>ID:</strong> {user.uid}
			</span>
			<span style={{ width: "25%" }}>
				<strong>E-Mail:</strong> {user.data.email}
			</span>
			<span style={{ width: "25%" }}>
				<strong>Username:</strong> {user.data.displayName}
			</span>
			{/* <span><strong>Created at: </strong></span> */}
			<span style={{ width: "10%" }}>
				<Link to={`${ROUTES.ADMIN}/users/${user.uid}`}>Details</Link>
			</span>
			{/* <span>
				<strong>Role: </strong>
			</span> */}
		</li>
	);
};

export default User;
