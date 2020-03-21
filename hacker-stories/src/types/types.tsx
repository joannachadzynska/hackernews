export interface ListProps {
	title: string;
	url: string;
	author: string;
	num_comments: number;
	points: number;
	objectID: number;
}

export type Story = {
	objectID: string;
	url: string;
	title: string;
	author: string;
	num_comments: number;
	points: number;
};

export type Stories = Array<Story>;
