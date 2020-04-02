import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
// import { AuthUserContext } from "../+Session";
import UsersList from "./UsersList";
import * as ROLES from "../../constants/roles";
import * as ROUTES from "../../constants/routes";

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
	const firebase = useContext(FirebaseContext);
	// const authUser: any = useContext(AuthUserContext);
	const [state, setState] = useState({
		loading: false,
		users: []
	});
	const history = useHistory();

	useEffect(() => {
		setState({
			...state,
			loading: true
		});

		const usersCollectionRef = firebase
			.usersFirestore()
			.onSnapshot((snapshot: any) => {
				setState({
					users: firebase.convertCollectionsSnapshotToMap(snapshot),
					loading: false
				});
			});

		return () => usersCollectionRef();
	}, [firebase, state]);

	const condition = (authUser: any) =>
		authUser && !!authUser.roles[ROLES.ADMIN];

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
	}, [firebase, history]);

	return (
		<div>
			<h1>Admin</h1>
			<p>The Admin Page is accessible by every signed in admin user.</p>

			{state.loading && <div>Loading...</div>}
			<p>Restricted area! Only users with the admin role are authorized</p>
			<UsersList users={state.users} />
		</div>
	);
};

export default Admin;
