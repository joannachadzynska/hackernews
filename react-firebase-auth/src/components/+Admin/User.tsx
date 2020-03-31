import React from "react";

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
			<span style={{ width: "30%" }}>
				<strong>E-Mail:</strong> {user.data.email}
			</span>
			<span style={{ width: "30%" }}>
				<strong>Username:</strong> {user.data.displayName}
			</span>

			{/* <span>
				<strong>Role: </strong>
			</span> */}
		</li>
	);
};

export default User;
