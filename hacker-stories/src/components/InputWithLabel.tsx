import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledLabel = styled.label`
	border-top: 1px solid #171212;
	border-left: 1px solid #171212;
	font-size: 1.5rem;
	padding-left: 5px;
`;

const StyledInput = styled.input`
	border: none;
	border-bottom: 1px solid #171212;
	background-color: transparent;
	font-size: 1.5rem;
`;

export interface InputWithLabelProps {
	id: string;
	value: string;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	children?: ReactNode;
	isFocused?: boolean;
}
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
