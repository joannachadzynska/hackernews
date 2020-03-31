import * as React from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import * as ROUTES from "../../constants/routes";

export interface HomeProps {
	authUser: any;
}

const Home: React.SFC<HomeProps> = ({ authUser }) => {
	const firebase = React.useContext(FirebaseContext);
	const history = useHistory();
	const condition = (authUser: any) => !!authUser;

	console.log("D: Home");

	React.useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged((authUser: any) => {
			if (!authUser) {
				history.push(ROUTES.SIGN_IN);
			}
		});

		return () => listener();
	}, []);

	React.useEffect(() => {
		const listen = firebase.onAuthUserListener((authUser: any) => {
			if (!condition(authUser)) {
				history.push(ROUTES.SIGN_IN);
			}
		});
		return () => listen();
	}, []);

	return (
		<div>
			<h1>Home</h1>
			<p>The Home Page is accessible by every signed in user.</p>
			<p>Hello, {authUser !== null ? authUser.displayName : "user"}</p>
		</div>
	);
};

export default Home;
