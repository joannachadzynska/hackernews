import React, { useState, useEffect, useContext } from "react";
import User from "./User";
import { FirebaseContext } from "../+Firebase";
import { StyledList } from "./style";

export interface UsersListProps {}

const UsersList: React.SFC<UsersListProps> = React.memo(() => {
	const firebase = useContext(FirebaseContext);
	// const authUser: any = useContext(AuthUserContext);
	const [state, setState] = useState({
		loading: false,
		users: []
	});

	const { loading, users } = state;
	// const history = useHistory();

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
	}, []);
	return (
		<div>
			<h2>Users</h2>
			<br />
			{loading && <div>Loading...</div>}
			<StyledList>
				<thead>
					<tr>
						<th>ID</th>
						<th>E-Mail</th>
						<th>Username</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user: any) => (
						<User key={user.uid} user={user} />
					))}
				</tbody>
			</StyledList>
		</div>
	);
});

export default UsersList;
