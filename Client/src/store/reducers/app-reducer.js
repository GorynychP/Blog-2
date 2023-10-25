import { ACTIONS_TYPE } from '../actions/actions-type';

const initialState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
};

export const appReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS_TYPE.LOGOUT:
			return { ...state, wasLogout: !state.wasLogout };
		case ACTIONS_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			};
		case ACTIONS_TYPE.CLOSE_MODAL:
			return initialState;
		default:
			return state;
	}
};
