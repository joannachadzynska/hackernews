import { ReactNode } from "react";

export interface InputWithLabelProps {
	id: string;
	value: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	children?: ReactNode;
	isFocused?: boolean;
	placeholder?: string;
	name: string;
}
