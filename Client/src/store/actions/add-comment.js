import { ACTIONS_TYPE } from './actions-type';

export const addComment = (comment) => ({
	type: ACTIONS_TYPE.ADD_COMMENT,
	payload: comment,
});
