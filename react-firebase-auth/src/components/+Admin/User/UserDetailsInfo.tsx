import React from "react";
import { doPasswordReset } from "../../+Firebase/firebase.utils";
import { Button } from "../../shared";
import { convertSecondsToDate } from "../../../helpers/utils";
import { StyledDetails } from "../style";

export interface UserDetailsInfoProps {
	user: any;
	id: string;
}

const UserDetailsInfo: React.SFC<UserDetailsInfoProps> = ({ user, id }) => {
	const onSendPasswordResetEmail = () => {
		doPasswordReset(user.email);
	};

	return (
		<StyledDetails>
			<span>
				<strong>ID: </strong>
				{id}
			</span>
			<span>
				<strong>E-Mail:</strong> {user.email}
			</span>
			<span>
				<strong>Username:</strong> {user.displayName}
			</span>
			<span>
				<strong>Created At:</strong>
				{convertSecondsToDate(user.createdAt?.seconds)}
			</span>
			<span>
				<Button onClick={onSendPasswordResetEmail}>Send Password Reset</Button>
			</span>
		</StyledDetails>
	);
};

export default UserDetailsInfo;
