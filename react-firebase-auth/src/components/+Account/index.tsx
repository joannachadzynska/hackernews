import * as React from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import * as ROUTES from "../../constants/routes";
import PasswordForgetForm from "../+PasswordForget/PasswordForgetForm";
import PasswordChangeForm from "../+PasswordChange/PasswordChangeForm";

export interface AccountProps {
	authUser: any;
}

const Account: React.SFC<AccountProps> = ({ authUser }) => {
	const firebase = React.useContext(FirebaseContext);
	const history = useHistory();

	React.useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((authUser: any) => {
			if (!authUser) {
				history.push(ROUTES.SIGN_IN);
			}
		});

		return () => listener();
	}, []);

	return (
		<div>
			<h1>Account: {authUser !== null ? authUser.email : "user email"}</h1>

			<PasswordForgetForm firebase={firebase} />
			<PasswordChangeForm firebase={firebase} />
		</div>
	);
};

export default Account;
