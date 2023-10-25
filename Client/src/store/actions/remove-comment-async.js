import { request } from '../../components/utils/request';
import { removeComent } from './remove-comment';

export const removeCommentAsync = (postId, id) => (dispatch) => {
	request(`/posts/${postId}/comments/${id}`, 'DELETE').then(() => {
		dispatch(removeComent(id));
	});
};
