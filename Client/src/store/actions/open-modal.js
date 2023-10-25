import { ACTIONS_TYPE } from './actions-type';

export const openModal = (modalParams) => ({
	type: ACTIONS_TYPE.OPEN_MODAL,
	payload: modalParams,
});
