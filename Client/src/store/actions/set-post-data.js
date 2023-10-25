import { ACTIONS_TYPE } from './actions-type';

export const setPostData = (postData) => ({
	type: ACTIONS_TYPE.SET_POST_DATA,
	payload: postData,
});
