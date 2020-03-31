import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import UsersList from "./UsersList";

export interface AdminProps {}

const Admin: React.SFC<AdminProps> = () => {
	const firebase = useContext(FirebaseContext);
	const [state, setState] = useState({
		loading: false,
		users: []
	});

	useEffect(() => {
		setState({
			...state,
			loading: true
		});

		// firebase.users().on("value", (snapshot: any) => {
		// 	setState({
		// 		users: snapshot.val(),
		// 		loading: false
		// 	});
		// });

		const usersCollectionRef = firebase
			.usersFirestore()
			.onSnapshot((snapshot: any) => {
				setState({
					users: firebase.convertCollectionsSnapshotToMap(snapshot),
					loading: false
				});
			});

		return () => usersCollectionRef();
	}, []);

	return (
		<div>
			<h1>Admin</h1>
			{state.loading && <div>Loading...</div>}
			<p>Restricted area! Only users with the admin role are authorized</p>
			<UsersList users={state.users} />
		</div>
	);
};

export default Admin;
