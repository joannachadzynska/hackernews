export const API_BASE = "https://hn.algolia.com/api/v1";
export const API_SEARCH = "/search";
export const PARAM_SEARCH = "query=";
export const PARAM_PAGE = "page=";

export const getUrl = (searchTerm: string, page: number) =>
	`${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;

export const extractSearchTerm = (url: any) =>
	url
		.substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
		.replace(PARAM_SEARCH, "");
