import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setVisibilityFilter } from "./filtersSlice";
import { Button } from "../../components/shared";

export interface LinkProps {
	filter: any;
}

const Link: React.SFC<LinkProps> = ({ children, filter }) => {
	const dispatch = useDispatch();
	const filters = useSelector((state: any) => state.filters);
	const active = filter === filters;
	return (
		<Button
			onClick={() => dispatch(setVisibilityFilter(filter))}
			disabled={active}>
			{children}
		</Button>
	);
};

export default Link;
