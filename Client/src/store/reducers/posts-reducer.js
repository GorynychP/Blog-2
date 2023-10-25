const initialState = [];

export const postsReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case '1':
			return {};
		case '2':
			return {};
		case '3':
			return {};

		default:
			return state;
	}
};
