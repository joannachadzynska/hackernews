import React from "react";
import { useHistory } from "react-router-dom";
import { doSignOut } from "../+Firebase/firebase.utils";
import * as ROUTES from "../../constants/routes";
import { SignOutButton } from "./style";

export interface SignOutProps {}

const SignOut: React.SFC<SignOutProps> = () => {
	const history = useHistory();

	return (
		<SignOutButton
			type='button'
			onClick={() => {
				doSignOut();
				history.push(ROUTES.LANDING);
			}}>
			Sign Out
		</SignOutButton>
	);
};

export default SignOut;
