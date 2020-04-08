import React from "react";

import PasswordChangeForm from "./PasswordChangeForm";

export interface PasswordChangeProps {}

const PasswordChange: React.SFC<PasswordChangeProps> = () => {
	return (
		<div>
			<h1>Password change</h1>
			<PasswordChangeForm />
		</div>
	);
};

export default PasswordChange;
