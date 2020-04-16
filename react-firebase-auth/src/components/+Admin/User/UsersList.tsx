import React, { useState, useEffect } from "react";
import User from "./User";
import { StyledList } from "../style";
import {
	usersFirestore,
	convertCollectionsSnapshotToMap,
} from "../../+Firebase/firebase.utils";

export interface UsersListProps {}

const UsersList: React.SFC<UsersListProps> = React.memo(() => {
	const [state, setState] = useState({
		loading: false,
		users: [],
	});

	const { loading, users } = state;

	const getAllUsers = () => {
		setState({
			...state,
			loading: true,
		});

		usersFirestore().onSnapshot((snapshot: any) => {
			setState({
				users: convertCollectionsSnapshotToMap(snapshot),
				loading: false,
			});
		});
	};

	useEffect(() => {
		getAllUsers();
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
