import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../components/+Firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
	Navigation,
	LandingPage,
	SignIn,
	SignUp,
	PasswordForget,
	Home,
	Account,
	Admin
} from "../components";
import * as ROUTES from "../constants/routes";
// import { Counter } from "../features/counter/Counter";
import "./App.css";

function App() {
	const [authUser, setAuthUser] = useState(null);
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.auth.onAuthStateChanged(async (authUser: any) => {
			if (authUser) {
				const userRef = await firebase.createUserProfileDocument(authUser);
				userRef.onSnapshot((snapShot: any) => {
					setAuthUser({ id: snapShot.id, ...snapShot.data() });
				});
			}

			setAuthUser(authUser);
		});

		return () => listener();
	}, []);

	return (
		<Router>
			<Navigation authUser={authUser} />

			<hr />
			<Switch>
				<Route exact path={ROUTES.LANDING}>
					<LandingPage />
				</Route>
				<Route path={ROUTES.SIGN_UP}>
					<SignUp />
				</Route>
				<Route path={ROUTES.SIGN_IN}>
					<SignIn />
				</Route>
				<Route path={ROUTES.PASSWORD_FORGET}>
					<PasswordForget />
				</Route>
				<Route path={ROUTES.HOME}>
					<Home authUser={authUser} />
				</Route>
				<Route path={ROUTES.ACCOUNT}>
					<Account />
				</Route>
				<Route path={ROUTES.ADMIN}>
					<Admin />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
