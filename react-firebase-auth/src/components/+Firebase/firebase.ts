import app from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

interface FirebaseInterface {}

class Firebase implements FirebaseInterface {
	auth: any;
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
	}

	// *** AUTH API ***//
	doCreateUserWithEmailAndPassword = (email: string, password: any) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email: string, password: any) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = (password: any) =>
		this.auth.currentUser.updatePassword(password);
}
// firebase.analytics();

export default Firebase;
