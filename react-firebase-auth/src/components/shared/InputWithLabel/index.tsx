import * as React from "react";
import { InputWithLabelProps } from "./types";
import { StyledInputWithLabel } from "./style";
import "./style.scss";

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
		<StyledInputWithLabel>
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
			<span className='highlight'></span>
			<span className='bar'></span>
			<label>{children}</label>
		</StyledInputWithLabel>
	);
};

export default InputWithLabel;
