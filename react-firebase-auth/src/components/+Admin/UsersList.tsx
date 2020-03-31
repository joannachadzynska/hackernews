import React from "react";

export interface UsersListProps {
	users: any;
}

const UsersList: React.SFC<UsersListProps> = ({ users }) => {
	console.log(users);

	return (
		<ul>
			{users.map((user: any) => (
				<li key={user.uid}>
					<span>
						<strong>ID:</strong> {user.uid}
					</span>
					<span>
						<strong>E-Mail:</strong> {user.data.email}
					</span>
					<span>
						<strong>Username:</strong> {user.data.displayName}
					</span>
				</li>
			))}
		</ul>
	);
};

export default UsersList;
