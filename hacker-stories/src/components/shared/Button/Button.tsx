import React from "react";
import { ButtonProps } from "./types";

const Button: React.SFC<ButtonProps> = ({ children }) => {
	return <button>{children}</button>;
};

export default Button;
