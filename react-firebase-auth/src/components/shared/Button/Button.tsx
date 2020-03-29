import * as React from "react";

export interface ButtonProps {
	children: React.ReactNode;
	type?: any;
	disabled?: boolean;
	onClick?: any;
}

const Button: React.SFC<ButtonProps> = ({ children, ...shared }) => {
	return <button {...shared}>{children}</button>;
};

export default Button;
