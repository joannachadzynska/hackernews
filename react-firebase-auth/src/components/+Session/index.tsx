import React from "react";
import AuthUserContext from "./context";

export interface SessionProps {}

const Session: React.SFC<SessionProps> = () => {
	return (
		<div>
			<h1>Session</h1>
		</div>
	);
};

export default Session;

export { AuthUserContext };
