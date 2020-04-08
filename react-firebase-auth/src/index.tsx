import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import { store, persistor } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Firebase, { FirebaseContext } from "./components/+Firebase";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
	<FirebaseContext.Provider value={new Firebase()}>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<App />
			</PersistGate>
		</Provider>
	</FirebaseContext.Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
