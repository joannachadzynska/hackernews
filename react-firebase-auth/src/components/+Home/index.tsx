import * as React from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContext } from "../+Firebase";
import { AuthUserContext } from "../+Session";
import * as ROUTES from "../../constants/routes";
import { Button } from "../shared";

export interface HomeProps {}

const needsEmailVerification = (authUser: any) =>
	authUser &&
	!authUser.emailVerified &&
	authUser.providerData !== undefined &&
	authUser.providerData
		.map((provider: any) => provider.providerId)
		.includes("password");

const Home: React.SFC<HomeProps> = () => {
	const firebase = React.useContext(FirebaseContext);

	const history = useHistory();

	const authUser: any = React.useContext(AuthUserContext);

	const condition = (authUser: any) => !!authUser;

	const [isSent, setIsSent] = React.useState(false);

	const onSendEmailVerification = () => {
		firebase.doSendEmailVerification();
		setIsSent(true);
	};

	React.useEffect(() => {
		const listen = firebase.onAuthUserListener(
			(authUser: any) => {
				if (!condition(authUser)) {
					history.push(ROUTES.SIGN_IN);
				}
			},
			() => history.push(ROUTES.SIGN_IN)
		);

		return () => listen();
	}, [firebase, history]);

	return needsEmailVerification(authUser) ? (
		<div>
			{isSent ? (
				<p>
					E-Mail confirmation sent: Check your E-Mails (spam folder included)
					for a confirmation E-Mail. Refresh this page once you confirmed your
					E-Mail.
				</p>
			) : (
				<p>
					Verify your E-mail: Check your E-Mails (Spam included) for a
					confirmation E-Mail or send another confirmation E-mail.
				</p>
			)}

			<Button onClick={onSendEmailVerification} disabled={isSent}>
				Send conformation E-mail
			</Button>
		</div>
	) : (
		<div>
			<h1>Home</h1>
			<p>The Home Page is accessible by every signed in user.</p>
			<p>Hello, {authUser !== null ? authUser.displayName : "user"}</p>
		</div>
	);
};

export default Home;
