import React from "react";
import { InputWithLabelProps } from "./types";
import { StyledInput, StyledLabel } from "./style";

const InputWithLabel: React.SFC<InputWithLabelProps> = ({
	id,
	type = "text",
	value,
	onInputChange,
	children,
	isFocused
}) => {
	const inputRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if (isFocused && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isFocused]);

	return (
		<>
			<StyledLabel htmlFor={id}>{children}</StyledLabel>
			&nbsp;
			<StyledInput
				ref={inputRef}
				id={id}
				type={type}
				value={value}
				onChange={onInputChange}
				autoFocus={isFocused}
			/>
		</>
	);
};

export default InputWithLabel;
