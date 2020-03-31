import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";

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
	db: any;
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();
		this.firestore = app.firestore();
		this.db = app.database();
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
			const { displayName, email } = userAuth;
			const createdAt = new Date();

			try {
				await userRef.set({
					displayName,
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

	// *** USER API ***//
	user = (uid: any) => this.db.ref(`users/${uid}`);
	users = () => this.db.ref("users");
	usersFirestore = () => this.firestore.collection("users");
	convertCollectionsSnapshotToMap = (collections: any) => {
		const transformedCollection = collections.docs.map((doc: any) => {
			const data = doc.data();

			return {
				uid: doc.id,
				data
			};
		});

		return transformedCollection;
	};

	createProfileDocument = async (userAuth: any, data: any) => {
		if (!userAuth) return;
		const userRef = this.user(userAuth.uid);

		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...data
			});
		} catch (error) {
			console.log(`error creating user ${error.message}`);
		}

		return userRef;
	};
}

// firebase.analytics();

export default Firebase;
