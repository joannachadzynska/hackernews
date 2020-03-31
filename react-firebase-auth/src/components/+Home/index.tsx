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
			<h1>Home</h1>
			<p>Hello, {authUser !== null ? authUser.displayName : "user"}</p>
		</div>
	);
};

export default Home;
