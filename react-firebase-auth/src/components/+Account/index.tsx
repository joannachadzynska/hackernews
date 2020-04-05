import * as React from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import * as ROUTES from "../../constants/routes";
import PasswordForgetForm from "../+PasswordForget/PasswordForgetForm";
import PasswordChangeForm from "../+PasswordChange/PasswordChangeForm";
import LoginManagement from "./LoginManagement";

export interface AccountProps {}

const Account: React.SFC<AccountProps> = () => {
	const firebase = React.useContext(FirebaseContext);
	const history = useHistory();
	const authUser: any = React.useContext(AuthUserContext);

	React.useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((authUser: any) => {
			if (!authUser) {
				history.push(ROUTES.SIGN_IN);
			}
		});

		return () => listener();
	}, [firebase, history]);

	return (
		<div>
			<h1>Account: {authUser !== null ? authUser.email : "user email"}</h1>

			<PasswordForgetForm firebase={firebase} />

			<br />
			<hr />
			<br />
			<PasswordChangeForm firebase={firebase} />
			<br />
			<hr />
			<br />
			<LoginManagement authUser={authUser} />
		</div>
	);
};

export default Account;
