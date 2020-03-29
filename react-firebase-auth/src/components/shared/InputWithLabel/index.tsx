import * as React from "react";
import { InputWithLabelProps } from "./types";

const InputWithLabel: React.SFC<InputWithLabelProps> = ({
	id,
	type = "text",
	value,
	onInputChange,
	children,
	isFocused,
	placeholder,
	name
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);
	return (
		<>
			<label htmlFor={id}>{children}</label>
			<input
				ref={inputRef}
				type={type}
				id={id}
				name={name}
				value={value}
				onChange={onInputChange}
				autoFocus={isFocused}
				placeholder={placeholder}
			/>
		</>
	);
};

export default InputWithLabel;
