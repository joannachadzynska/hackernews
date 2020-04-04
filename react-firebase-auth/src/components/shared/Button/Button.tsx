import * as React from "react";
import { StyledButton } from "./style";

export interface ButtonProps {
	children: React.ReactNode;
	type?: any;
	disabled?: boolean;
	onClick?: any;
	onSubmit?: any;
}

const Button: React.SFC<ButtonProps> = ({ children, ...shared }) => {
	return <StyledButton {...shared}>{children}</StyledButton>;
};

export default Button;
