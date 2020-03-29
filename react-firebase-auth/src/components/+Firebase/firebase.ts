import app, { firestore } from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

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
	firestore: any;
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.firestore = app.firestore();
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

	createUserProfileDocument = async (userAuth: any, additionalData: any) => {
		if (!userAuth) return;

		const userRef = this.firestore.doc(`users/${userAuth.uid}`);
		const snapShot = await userRef.get();

		if (!snapShot.exists) {
			const { username, email } = userAuth;
			const createdAt = new Date();

			try {
				await userRef.set({
					username,
					email,
					createdAt,
					...additionalData
				});
			} catch (error) {
				console.log(`error creating user ${error.message}`);
			}
		}

		return userRef;
	};
}
// firebase.analytics();

export default Firebase;
