import React from "react";
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
	return (
		<Router>
			<Navigation />

			<hr />
			<Switch>
				<Route exact path={ROUTES.LANDING}>
					<LandingPage />
				</Route>
				<Route path={ROUTES.SIGN_UP} component={SignUp} />
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
		</Router>
	);
}

export default App;
