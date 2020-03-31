import React from "react";
import User from "./User";
import { StyledList } from "./style";

export interface UsersListProps {
	users: any;
}

const UsersList: React.SFC<UsersListProps> = React.memo(({ users }) => {
	return (
		<StyledList>
			{users.map((user: any) => (
				<User key={user.uid} user={user} />
			))}
		</StyledList>
	);
});

export default UsersList;
