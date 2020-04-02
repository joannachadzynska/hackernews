import React, { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import { Button } from "../shared";

export interface LoginManagementProps {}

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

const LoginManagement: React.SFC<LoginManagementProps> = () => {
	const firebase = useContext(FirebaseContext);
	const authUser: any = useContext(AuthUserContext);
	const [state, setState] = useState({
		activeSignInMethods: [],
		error: null
	});

	console.log(authUser.email);
	const email = authUser.email !== null ? authUser.email : "nic";
	useEffect(() => {
		// const listener = firebase.auth
		// 	.fetchSignInMethodsForEmail(email)
		// 	.then((activeSignInMethods: any) =>
		// 		setState({ activeSignInMethods, error: null })
		// 	)
		// 	.catch((error: any) => setState({ ...state, error: error.message }));
		// return () => listener();
	}, []);
	return (
		<div>
			Sign In Methods:
			<ul>
				{SIGN_IN_METHODS.map((method: any) => {
					console.log(method.id);

					// const isEnabled = state.activeSignInMethods.includes(method.id);
					return (
						<li key={method.id}>
							<Button type='button' onClick={() => {}}>
								{method.id}
							</Button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default LoginManagement;
