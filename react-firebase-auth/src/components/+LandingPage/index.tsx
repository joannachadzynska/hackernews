import React from "react";
import { Link } from "react-router-dom";
import { StyledLandingPage, Title, Subtitle, MainButton } from "./style";
import * as ROUTES from "../../constants/routes";

export interface LandingPageProps {}

const LandingPage: React.SFC<LandingPageProps> = () => {
	return (
		<StyledLandingPage>
			<Title>Landing Page...</Title>
			<Subtitle>welcome here something blah blah blah</Subtitle>
			<MainButton>
				<Link to={ROUTES.SIGN_IN}>Sign in now</Link>
			</MainButton>
		</StyledLandingPage>
	);
};

export default LandingPage;
