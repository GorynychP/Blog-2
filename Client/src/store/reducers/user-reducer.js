import { ROLE } from '../../components/constants';
import { ACTIONS_TYPE } from '../actions/actions-type';

const initialState = {
	id: null,
	login: null,
	roleId: ROLE.GUEST,
	session: null,
};

export const userReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case ACTIONS_TYPE.SET_USER:
			return { ...state, ...payload };
		case ACTIONS_TYPE.LOGOUT:
			return initialState;
		case '3':
			return {};

		default:
			return state;
	}
};
