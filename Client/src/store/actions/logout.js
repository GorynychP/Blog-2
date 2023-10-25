import { request } from '../../components/utils/request';
import { ACTIONS_TYPE } from './actions-type';

export const logout = () => {
	request('/logout', 'POST');
	return {
		type: ACTIONS_TYPE.LOGOUT,
	};
};
