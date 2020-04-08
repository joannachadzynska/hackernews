import { format, fromUnixTime, formatDistance } from "date-fns";

export const convertSecondsToDate = (timestamp: number) => {
	if (timestamp === undefined) return;
	const date = fromUnixTime(timestamp);
	// const today = new Date();
	// const distance = formatDistance(date, today);

	return format(date, "eeee do MMMM yyyy, kk:mm:ss, OOOO");
};

export const convertMessageDate = (timestamp: number) => {
	const date = fromUnixTime(timestamp);
	// const formatDate = format(date, "iii LLL y, k:m:s");
	const today = new Date();
	const distance = formatDistance(date, today);

	return distance;
};
