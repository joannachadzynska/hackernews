import * as React from "react";
import { FirebaseContext } from "../+Firebase";

export const AuthUserContext = React.createContext(null);

const AuthUserProvider = (props: any) => {
	const [authUser, setAuthUser] = React.useState(null);
	const firebase = React.useContext(FirebaseContext);

	React.useEffect(() => {
		const listener = firebase.onAuthUserListener(
			(authUser: any) => {
				setAuthUser(authUser);
			},
			() => {
				setAuthUser(null);
			}
		);

		return () => listener();
	}, []);

	return <AuthUserContext.Provider value={authUser} {...props} />;
};

const useAuthUserContext = () => React.useContext(AuthUserContext);

export { AuthUserProvider, useAuthUserContext };
