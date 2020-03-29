import React, { useState, useEffect, useContext } from "react";
import { AuthUserContext } from "./index";
import { FirebaseContext } from "../+Firebase";

export interface useAuthProps {}

const useAuth: React.SFC<useAuthProps> = () => {
	const [authUser, setAuthUser] = useState(null);
	const context = useContext(AuthUserContext);
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
	return <AuthUserContext.Consumer>{}</AuthUserContext.Consumer>;
};

export default useAuth;
