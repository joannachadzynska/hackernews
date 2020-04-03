import React from "react";
import { Button } from "../shared";

export interface SocialLoginToggleProps {
	onlyOneLeft: boolean;
	isEnabled: boolean;
	signInMethod: any;
	onLink: any;
	onUnLink: any;
}

const SocialLoginToggle: React.SFC<SocialLoginToggleProps> = ({
	onlyOneLeft,
	isEnabled,
	signInMethod,
	onLink,
	onUnLink
}) =>
	isEnabled ? (
		<Button onClick={() => onUnLink(signInMethod.id)} disabled={onlyOneLeft}>
			Deactivate {signInMethod.id}
		</Button>
	) : (
		<Button onClick={() => onLink(signInMethod.provider)}>
			Link {signInMethod.id}
		</Button>
	);

export default SocialLoginToggle;
