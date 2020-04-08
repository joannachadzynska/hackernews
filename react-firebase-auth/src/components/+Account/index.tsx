import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { auth } from "../+Firebase/firebase.utils";
import * as ROUTES from "../../constants/routes";
import PasswordForgetForm from "../+PasswordForget/PasswordForgetForm";
import PasswordChangeForm from "../+PasswordChange/PasswordChangeForm";
import LoginManagement from "./LoginManagement";

export interface AccountProps {}

const Account: React.SFC<AccountProps> = () => {
	const history = useHistory();
	const authUser = useSelector((state: any) => state.auth.currentUser);

	React.useEffect(() => {
		const listener = auth.onAuthStateChanged((authUser: any) => {
			if (!authUser) {
				history.push(ROUTES.SIGN_IN);
			}
		});

		return () => listener();
	}, [history]);

	return (
		<div>
			<h1>Account: {authUser !== null ? authUser.email : "user email"}</h1>

			<PasswordForgetForm />

			<br />
			<hr />
			<br />
			<PasswordChangeForm />
			<br />
			<hr />
			<br />
			<LoginManagement authUser={authUser} />
			<br />
			<br />
		</div>
	);
};

export default Account;
