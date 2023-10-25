import { ACTIONS_TYPE } from './actions-type';

export const setUser = (user) => ({
	type: ACTIONS_TYPE.SET_USER,
	payload: user,
});
