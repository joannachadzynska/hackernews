import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import * as ROUTES from "../../constants/routes";
import { SignOutButton } from "./style";

export interface SignOutProps {}

const SignOut: React.SFC<SignOutProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();

	return (
		<SignOutButton
			type='button'
			onClick={() => {
				firebase.doSignOut();
				history.push(ROUTES.LANDING);
			}}>
			Sign Out
		</SignOutButton>
	);
};

export default SignOut;
