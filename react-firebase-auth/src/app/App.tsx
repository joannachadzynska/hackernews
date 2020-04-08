import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/auth/authSlice";
import {
	createUserProfileDocument,
	onAuthUserListener
} from "../components/+Firebase/firebase.utils";
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
import "./App.css";

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const listener = onAuthUserListener(
			(authUser: any) => {
				if (authUser) {
					const displayName = authUser.displayName;
					createUserProfileDocument(authUser, {
						displayName
					});
					// userRef.onSnapshot((snapShot: any) => {
					// 	setAuthUser({ id: snapShot.id, ...snapShot.data() });
					// });
				}

				dispatch(setCurrentUser(authUser));
			},
			() => {
				dispatch(setCurrentUser(""));
			}
		);

		return () => listener();
	}, [dispatch]);

	return (
		<Router>
			<header>
				<Navigation />
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
	);
};

export default App;
