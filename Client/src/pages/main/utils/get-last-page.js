export const getLastPageFromLink = (links) => {
	const result = links.match(/_page=(\d{1,4})&_limit=\d{1,3}>; rel="last"/);
	if (result) {
		return Number(result[1]);
	}
	return null;
};
