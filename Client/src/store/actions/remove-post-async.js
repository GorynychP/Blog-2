import { request } from '../../components/utils/request';

export const removePostAsync = (postId) => (dispatch) =>
	request(`/posts/${postId}`, 'DELETE');
