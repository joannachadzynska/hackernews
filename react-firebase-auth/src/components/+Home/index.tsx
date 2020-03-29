import React from "react";

export interface HomeProps {
	authUser: any;
}

const Home: React.SFC<HomeProps> = ({ authUser }) => {
	return (
		<div>
			<h1>Home</h1>
			<p>Hello, {authUser !== null ? authUser.displayName : "user"}</p>
		</div>
	);
};

export default Home;
