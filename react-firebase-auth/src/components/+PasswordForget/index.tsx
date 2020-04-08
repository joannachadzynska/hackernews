import * as React from "react";
import PasswordForgetForm from "./PasswordForgetForm";
import PasswordForgetLink from "./PasswordForgetLink";

export interface PasswordForgetProps {}

const PasswordForget: React.SFC<PasswordForgetProps> = () => {
	return (
		<div>
			<h1>Password Forget</h1>
			<PasswordForgetForm />
		</div>
	);
};

export default PasswordForget;
export { PasswordForgetLink };
