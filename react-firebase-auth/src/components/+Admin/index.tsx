import React, { useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";

import UsersList from "./User/UsersList";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import UserDetails from "./User/UserDetails";
import { onAuthUserListener } from "../+Firebase/firebase.utils";

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
	const history = useHistory();

	const condition = (authUser: any) =>
		authUser && authUser.roles.includes(ROLES.ADMIN);

	useEffect(() => {
		const listen = onAuthUserListener(
			(authUser: any) => {
				if (!condition(authUser)) {
					history.push(ROUTES.SIGN_IN);
				}
			},
			() => history.push(ROUTES.SIGN_IN)
		);
		return () => listen();
	}, [history]);

	return (
		<div>
			<h1>Admin</h1>
			<p>The Admin Page is accessible by every signed in admin user.</p>
			<p>Restricted area! Only users with the admin role are authorized</p>
			<br />
			<Switch>
				<Route exact path={ROUTES.ADMIN_USERS_DETAILS}>
					<UserDetails />
				</Route>
				<Route exact path={ROUTES.ADMIN}>
					<UsersList />
				</Route>
			</Switch>
		</div>
	);
};

export default Admin;
