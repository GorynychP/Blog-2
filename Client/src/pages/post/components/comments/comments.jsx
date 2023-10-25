import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components/comment';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../store/actions';
import { checkAccess } from '../../../../components/utils/check-access';
import { PROP_TYPE, ROLE } from '../../../../components/constants';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const roleId = useSelector(selectorUserRole);
	const dispatch = useDispatch();
	const accessGuest = checkAccess([ROLE.GUEST], roleId);
	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};
	return (
		<div className={className}>
			{!accessGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комметнарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						id="fa-paper-plane-o"
						margin="0px 0 0px 8px"
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments
					? comments.map(({ id, author, publishedAt, content }) => (
							<Comment
								key={id}
								id={id}
								postId={postId}
								author={author}
								publishedAt={publishedAt}
								content={content}
							/>
					  ))
					: null}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 0 auto;
	& textarea {
		font-size: 16px;
		padding: 10px;
		width: 550px;
		resize: none;
		min-height: 100px;
	}
	& .new-comment {
		display: flex;
		width: 100%;
		margin: 15px 0 10px 0;
	}
`;
Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
