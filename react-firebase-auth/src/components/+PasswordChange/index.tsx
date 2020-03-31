import React, { useContext } from "react";
import { FirebaseContext } from "../+Firebase";
import PasswordChangeForm from "./PasswordChangeForm";

export interface PasswordChangeProps {}

const PasswordChange: React.SFC<PasswordChangeProps> = () => {
	const firebase = useContext(FirebaseContext);
	return (
		<div>
			<h1>Password change</h1>
			<PasswordChangeForm firebase={firebase} />
		</div>
	);
};

export default PasswordChange;
