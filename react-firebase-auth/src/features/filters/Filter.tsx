import React from "react";
import Link from "./Link";
import { VisibilityFilters } from "./filtersSlice";

export interface FooterProps {}

const Filter: React.SFC<FooterProps> = () => {
	return (
		<div>
			<span>Show: </span>
			<Link filter={VisibilityFilters.SHOW_ALL}>All</Link>
			<Link filter={VisibilityFilters.SHOW_ACTIVE}>Active</Link>
			<Link filter={VisibilityFilters.SHOW_COMPLETED}>Completed</Link>
		</div>
	);
};

export default Filter;
