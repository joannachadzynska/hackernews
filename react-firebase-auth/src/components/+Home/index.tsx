import * as React from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import * as ROUTES from "../../constants/routes";

export interface HomeProps {}

const Home: React.SFC<HomeProps> = () => {
	const firebase = React.useContext(FirebaseContext);
	const history = useHistory();
	const authUser: any = React.useContext(AuthUserContext);
	const condition = (authUser: any) => !!authUser;

	React.useEffect(() => {
		const listen = firebase.onAuthUserListener((authUser: any) => {
			if (!condition(authUser)) {
				history.push(ROUTES.SIGN_IN);
			}
		});
		return () => listen();
	}, [firebase, history]);

	return (
		<div>
			<h1>Home</h1>
			<p>The Home Page is accessible by every signed in user.</p>
			<p>Hello, {authUser !== null ? authUser.displayName : "user"}</p>
		</div>
	);
};

export default Home;
