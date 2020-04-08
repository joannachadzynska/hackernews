import firebase from "firebase/app";
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

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const emailAuthProvider = firebase.auth.EmailAuthProvider;
export const googleProvider = new firebase.auth.GoogleAuthProvider().setCustomParameters(
	{ prompt: "select_account" }
);
export const facebookProvider = new firebase.auth.FacebookAuthProvider().setCustomParameters(
	{ display: "popup" }
);
export const twitterProvider = new firebase.auth.TwitterAuthProvider().setCustomParameters(
	{ display: "popup" }
);

export const userFirestore = (uid: any) =>
	firestore.collection("users").doc(`${uid}`);

export const usersFirestore = () => firestore.collection("users");

// *** Message API *** //
export const messageFirestore = (uid: any) =>
	firestore.collection("messages").doc(`${uid}`);
export const messagesFirestore = () => firestore.collection("messages");

// *** Auth API ***//
export const doCreateUserWithEmailAndPassword = (
	email: string,
	password: any
) => auth.createUserWithEmailAndPassword(email, password);

export const doSignInWithEmailAndPassword = (email: string, password: any) =>
	auth.signInWithEmailAndPassword(email, password);

export const doSignInWithGoogle = () => auth.signInWithPopup(googleProvider);

export const doSignInWithFacebook = () =>
	auth.signInWithPopup(facebookProvider);

export const doSignInWithTwitter = () => auth.signInWithPopup(twitterProvider);

export const doSignOut = () => auth.signOut();

export const doPasswordReset = (email: string) =>
	auth.sendPasswordResetEmail(email);

export const doPasswordUpdate = (password: any) =>
	auth.currentUser?.updatePassword(password);

export const doSendEmailVerification = () =>
	auth.currentUser?.sendEmailVerification();

export const createUserProfileDocument = async (
	userAuth: any,
	additionalData: any
) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);
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
export const onAuthUserListener = (next: any, fallback: any) =>
	auth.onAuthStateChanged((authUser: any) => {
		if (authUser) {
			userFirestore(authUser.uid).onSnapshot((snapshot: any) => {
				const dbUser = snapshot.data();

				if (dbUser.roles === undefined) {
					dbUser.roles = [];
				} else {
					// console.log("roles:", dbUser.roles);
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

export const convertCollectionsSnapshotToMap = (collections: any) => {
	const transformedCollection = collections.docs.map((doc: any) => {
		const data = doc.data();

		return {
			uid: doc.id,
			data
		};
	});

	return transformedCollection;
};

export default firebase;
