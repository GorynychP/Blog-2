import { ACTIONS_TYPE } from './actions-type';

export const removeComent = (commentId) => ({
	type: ACTIONS_TYPE.REMOVE_COMMENT,
	payload: commentId,
});
