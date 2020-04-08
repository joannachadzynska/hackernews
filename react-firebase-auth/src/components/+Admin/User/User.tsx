import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../constants/routes";

export interface UserProps {
	user: any;
	key?: any;
}

const User: React.SFC<UserProps> = ({ user }) => {
	return (
		<tr>
			<td>{user.uid}</td>
			<td>{user.data.email}</td>
			<td>{user.data.displayName}</td>

			<td>
				<Link
					to={{
						pathname: `${ROUTES.ADMIN}/users/${user.uid}`,
						state: { user }
					}}>
					Details
				</Link>
			</td>
		</tr>
	);
};

export default User;
