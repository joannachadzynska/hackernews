export type Story = {
	objectID: string;
	url: string;
	title: string;
	author: string;
	num_comments: number;
	points: number;
};

export type Stories = Array<Story>;

export interface ListItemProps {
	item: Story;
	key?: any;
	onRemoveItem: (item: Story) => void;
}
