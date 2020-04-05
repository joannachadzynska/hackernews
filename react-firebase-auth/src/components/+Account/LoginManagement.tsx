import React, { useContext, useState, useEffect, useCallback } from "react";
import { FirebaseContext } from "../+Firebase";
import DefaultLoginToggle from "./DefaultLoginToggle";
import SocialLoginToggle from "./SocialLoginToggle";
import { SignInMethodsList } from "./style";

export interface LoginManagementProps {
	authUser: any;
}

const SIGN_IN_METHODS = [
	{
		id: "password",
		provider: null
	},
	{
		id: "google.com",
		provider: "googleProvider"
	},
	{
		id: "facebook.com",
		provider: "facebookProvider"
	},
	{
		id: "twitter.com",
		provider: "twitterProvider"
	}
];

const LoginManagement: React.SFC<LoginManagementProps> = ({ authUser }) => {
	const firebase = useContext(FirebaseContext);

	const [state, setState] = useState({
		activeSignInMethods: [],
		error: null
	});

	const fetchSignInMethods = useCallback(() => {
		const email = authUser.email !== undefined ? authUser.email : "";

		firebase.auth
			.fetchSignInMethodsForEmail(email)
			.then((activeSignInMethods: any) =>
				setState({ activeSignInMethods, error: null })
			)
			.catch((error: any) => setState({ ...state, error: error.message }));
	}, [authUser.email]);

	useEffect(() => {
		// setUser(authUser);
		fetchSignInMethods();
	}, [fetchSignInMethods]);

	const onSocialLoginLink = (provider: any) => {
		firebase.auth.currentUser
			.linkWithPopup(firebase[provider])
			.then(fetchSignInMethods)
			.catch((err: any) => setState({ ...state, error: err.message }));
	};

	const onUnLink = (providerId: any) => {
		firebase.auth.currentUser
			.unLink(providerId)
			.then(fetchSignInMethods)
			.catch((err: any) => setState({ ...state, error: err.message }));
	};

	const onDefaultLoginLink = (password: any) => {
		const credential = firebase.emailAuthProvider.credential(
			authUser.email,
			password
		);

		firebase.auth.currentUser
			.linkAndRetrieveDataWithCredential(credential)
			.then(fetchSignInMethods)
			.catch((err: any) => setState({ ...state, error: err.message }));
	};

	return (
		<div>
			<h1>Login Management</h1>

			<SignInMethodsList>
				{SIGN_IN_METHODS.map((method: any) => {
					const onlyOneLeft = state.activeSignInMethods.length === 1;

					const isEnabled = state.activeSignInMethods.some(
						(el: any) => el === method.id
					);

					return (
						<li key={method.id}>
							{method.id === "password" ? (
								<DefaultLoginToggle
									onlyOneLeft={onlyOneLeft}
									isEnabled={isEnabled}
									signInMethod={method}
									onLink={onDefaultLoginLink}
									onUnLink={onUnLink}
								/>
							) : (
								<SocialLoginToggle
									onlyOneLeft={onlyOneLeft}
									isEnabled={isEnabled}
									signInMethod={method}
									onLink={onSocialLoginLink}
									onUnLink={onUnLink}
								/>
							)}
						</li>
					);
				})}
			</SignInMethodsList>
		</div>
	);
};

export default LoginManagement;
