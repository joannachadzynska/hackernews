import React, { useContext } from "react";
import { format, fromUnixTime } from "date-fns";

import { FirebaseContext } from "../+Firebase";
import { Button } from "../shared";

export interface UserDetailsInfoProps {
	user: any;
	id: string;
}

const UserDetailsInfo: React.SFC<UserDetailsInfoProps> = ({ user, id }) => {
	const firebase = useContext(FirebaseContext);
	const onSendPasswordResetEmail = () => {
		firebase.doPasswordReset(user.email);
	};

	const convertSecondsToDate = (timestamp: number) => {
		if (timestamp === undefined) return;
		const date = fromUnixTime(timestamp);
		const formatedDate = format(date, "eeee do MMMM yyyy, kk:mm:ss, OOOO");
		return formatedDate;
	};

	return (
		<div>
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
		</div>
	);
};

export default UserDetailsInfo;
