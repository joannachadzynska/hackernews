import React, { useContext, useEffect } from "react";
import { useHistory, Switch, Route } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
// import { AuthUserContext } from "../+Session";
import UsersList from "./UsersList";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";
import UserDetails from "./UserDetails";

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
	const firebase = useContext(FirebaseContext);
	// const authUser: any = useContext(AuthUserContext);

	const history = useHistory();

	const condition = (authUser: any) =>
		authUser && authUser.roles.includes(ROLES.ADMIN);

	useEffect(() => {
		const listen = firebase.onAuthUserListener(
			(authUser: any) => {
				if (!condition(authUser)) {
					history.push(ROUTES.SIGN_IN);
				}
			},
			() => history.push(ROUTES.SIGN_IN)
		);
		return () => listen();
	}, []);

	return (
		<div>
			<h1>Admin</h1>
			<p>The Admin Page is accessible by every signed in admin user.</p>
			<p>Restricted area! Only users with the admin role are authorized</p>

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
