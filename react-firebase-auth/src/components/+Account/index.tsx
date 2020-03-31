import * as React from "react";
import { FirebaseContext } from "../+Firebase";
import PasswordForgetForm from "../+PasswordForget/PasswordForgetForm";
import PasswordChangeForm from "../+PasswordChange/PasswordChangeForm";

export interface AccountProps {}

const Account: React.SFC<AccountProps> = () => {
	const firebase = React.useContext(FirebaseContext);
	return (
		<div>
			<h1>Account</h1>
			<PasswordForgetForm firebase={firebase} />
			<PasswordChangeForm firebase={firebase} />
		</div>
	);
};

export default Account;
