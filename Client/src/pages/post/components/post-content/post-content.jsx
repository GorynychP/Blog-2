import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	RESET_POST_DATA,
	openModal,
	removePostAsync,
} from '../../../../store/actions';
import { PROP_TYPE, ROLE } from '../../../../components/constants';
import { selectorUserRole } from '../../../../selectors';
import { checkAccess } from '../../../../components/utils/check-access';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectorUserRole);
	const isAdmin = checkAccess([ROLE.ADMIN], roleId);
	const onPostRemove = (PostId) => {
		dispatch(
			openModal({
				text: 'Удалить пост ?',
				onConfirm: () => {
					dispatch(removePostAsync(PostId)).then(() => {
						navigate('/');
					});
					dispatch(RESET_POST_DATA);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const formattedDate = new Date(publishedAt).toLocaleDateString();
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<h2>{title}</h2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="fa-calendar-o" margin="0px 10px 0 0px" />
					{formattedDate}
				</div>
				{isAdmin && (
					<div className="buttons">
						<Icon
							id="fa-pencil-square-o"
							margin="0px 15px 0 0px"
							onClick={() => navigate(`/post/${id}/edit`)}
						/>
						<Icon
							id="fa-trash-o"
							onClick={() => onPostRemove(id)}
						/>
					</div>
				)}
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 2px 0;
	}
	& h2 {
		text-align: left;
	}
	& .special-panel {
		display: flex;
		justify-content: space-between;
		text-align: left;
		margin: 0px 0 20px;
		font-size: 18px;
	}
	& .post-text {
		text-align: left;
		font-size: 18px;
	}
	& .published-at {
		display: flex;
		align-items: center;
	}
	& .buttons {
		display: flex;
	}
`;
PostContent.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
