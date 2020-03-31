import * as React from "react";
import { FirebaseContext } from "../+Firebase";
import PasswordForgetForm from "./PasswordForgetForm";
import PasswordForgetLink from "./PasswordForgetLink";

export interface PasswordForgetProps {}

const PasswordForget: React.SFC<PasswordForgetProps> = () => {
	const firebase = React.useContext(FirebaseContext);
	return (
		<div>
			<h1>Password Forget</h1>
			<PasswordForgetForm firebase={firebase} />
		</div>
	);
};

export default PasswordForget;
export { PasswordForgetLink };
