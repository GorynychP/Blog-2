import { ACTIONS_TYPE } from '../actions/actions-type';

const initialState = {
	id: '',
	title: '',
	image_url: '',
	content: '',
	published_at: '',
	comments: [],
};

export const postReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS_TYPE.ADD_COMMENT:
			return { ...state, comments: [...state.comments, payload] };
		case ACTIONS_TYPE.REMOVE_COMMENT:
			return {
				...state,
				comments: state.comments.filter(
					(comment) => comment.id !== payload,
				),
			};
		case ACTIONS_TYPE.SET_POST_DATA:
			return { ...state, ...payload };
		case ACTIONS_TYPE.RESET_POST_DATA:
			return initialState;
		case '3':
			return {};

		default:
			return state;
	}
};
