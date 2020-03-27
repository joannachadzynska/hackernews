import { extractSearchTerm } from "./api";

export const getSumComments = (stories: any) => {
	return stories.data.reduce(
		(result: any, value: any) => result + value.num_comments,
		0
	);
};

export const getLastSearches = (urls: any) =>
	urls
		.reduce((result: any, url: any, index: any) => {
			const searchTerm = extractSearchTerm(url).toLowerCase();

			if (index === 0) {
				return result.concat(searchTerm);
			}

			const previousSearchTerm = result[result.length - 1];

			if (searchTerm === previousSearchTerm) {
				return result;
			} else {
				return result.concat(searchTerm);
			}
		}, [])
		.slice(1)
		.slice(-5);
