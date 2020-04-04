import React, { useEffect, useContext } from "react";
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
import useSemiPersistentState from "../customHooks/SemiPersistentState";
import { AuthUserContext } from "../components/+Session";
import * as ROUTES from "../constants/routes";
import "./App.css";

const App = () => {
	const [authUser, setAuthUser] = useSemiPersistentState("authUser", null);
	const firebase = useContext(FirebaseContext);

	useEffect(() => {
		const listener = firebase.onAuthUserListener(
			(authUser: any) => {
				if (authUser) {
					const displayName = authUser.displayName;
					firebase.createUserProfileDocument(authUser, {
						displayName
					});
					// userRef.onSnapshot((snapShot: any) => {
					// 	setAuthUser({ id: snapShot.id, ...snapShot.data() });
					// });
				}
				// localStorage.setItem("authUser", JSON.stringify(authUser));
				setAuthUser(authUser);
			},
			() => {
				setAuthUser("");
				localStorage.removeItem("authUser");
			}
		);

		return () => listener();
	}, [firebase, setAuthUser]);

	return (
		<AuthUserContext.Provider value={authUser}>
			<Router>
				<header>
					<Navigation authUser={authUser} />
				</header>

				<main className='wrapper'>
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
							<Home />
						</Route>
						<Route path={ROUTES.ACCOUNT}>
							<Account />
						</Route>
						<Route path={ROUTES.ADMIN}>
							<Admin />
						</Route>
					</Switch>
				</main>

				<footer>
					<span className='wrapper'>
						© Joanna Chądzyńska {new Date().getFullYear()}
					</span>
				</footer>
			</Router>
		</AuthUserContext.Provider>
	);
};

export default App;
