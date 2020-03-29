import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import { Button } from "../shared";
import * as ROUTES from "../../constants/routes";

export interface SignOutProps {}

const SignOut: React.SFC<SignOutProps> = () => {
	const firebase = useContext(FirebaseContext);
	const history = useHistory();
	return (
		<Button
			type='button'
			onClick={() => {
				firebase.doSignOut();
				history.push(ROUTES.LANDING);
			}}>
			Sign Out
		</Button>
	);
};

export default SignOut;
