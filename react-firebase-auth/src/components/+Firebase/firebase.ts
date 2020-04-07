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
	googleProvider: any;
	facebookProvider: any;
	twitterProvider: any;
	emailAuthProvider: any;

	serverValue: any;

	constructor() {
		app.initializeApp(config);

		this.serverValue = app.database.ServerValue;

		this.emailAuthProvider = app.auth.EmailAuthProvider;
		this.auth = app.auth();
		this.firestore = app.firestore();
		this.db = app.database();
		this.googleProvider = new app.auth.GoogleAuthProvider().setCustomParameters(
			{ prompt: "select_account" }
		);
		this.facebookProvider = new app.auth.FacebookAuthProvider().setCustomParameters(
			{
				display: "popup"
			}
		);
		this.twitterProvider = new app.auth.TwitterAuthProvider().setCustomParameters(
			{
				display: "popup"
			}
		);
	}

	// *** AUTH API ***//
	doCreateUserWithEmailAndPassword = (email: string, password: any) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email: string, password: any) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

	doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

	doSignInWithTwitter = () => this.auth.signInWithPopup(this.twitterProvider);

	doSignOut = () => this.auth.signOut();

	doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = (password: any) =>
		this.auth.currentUser.updatePassword(password);

	doSendEmailVerification = () => this.auth.currentUser.sendEmailVerification();

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

	// *** Merge Auth and DB User API *** //
	onAuthUserListener = (next: any, fallback: any) =>
		this.auth.onAuthStateChanged((authUser: any) => {
			if (authUser) {
				this.userFirestore(authUser.uid).onSnapshot((snapshot: any) => {
					const dbUser = snapshot.data();

					if (dbUser.roles === undefined) {
						dbUser.roles = [];
					}

					authUser = {
						uid: authUser.uid,
						email: authUser.email,
						emailVerified: authUser.emailVerified,
						providerData: authUser.providerData,
						...dbUser
					};

					next(authUser);
				});
			} else {
				fallback();
			}
		});

	// *** USER API ***//
	user = (uid: any) => this.db.ref(`users/${uid}`);

	users = () => this.db.ref("users");

	userFirestore = (uid: any) =>
		this.firestore.collection("users").doc(`${uid}`);

	usersFirestore = () => this.firestore.collection("users");

	userRef = (userAuth: any) => this.firestore.doc(`users/${userAuth.uid}`);

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

	// *** Message API *** //
	message = (uid: any) => this.firestore.collection("messages").doc(`${uid}`);
	messages = () => this.firestore.collection("messages");
}

// firebase.analytics();

export default Firebase;
