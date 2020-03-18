import React from "react";

export interface InputWithLabelProps {
	id: string;
	label: string;
	value: string;
	onInputChange: any;
	type?: string;
	name?: string;
}

const InputWithLabel: React.SFC<InputWithLabelProps> = ({
	id,
	label,
	type = "text",
	value,
	onInputChange,
	name
}) => {
	return (
		<>
			<label htmlFor={id}>{label}</label>
			&nbsp;
			<input
				id={id}
				type={type}
				value={value}
				onChange={onInputChange}
				name={name}
			/>
		</>
	);
};

export default InputWithLabel;
