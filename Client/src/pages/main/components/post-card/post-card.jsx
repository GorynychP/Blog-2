import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link } from 'react-router-dom';

const PostCardContainer = ({
	id,
	imageUrl,
	title,
	publishedAt,
	commentsCount,
	className,
}) => {
	const formattedDate = new Date(publishedAt).toLocaleDateString();
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
			</Link>
			<div className="post-card-footer">
				<h3>{title}</h3>
				<div className="post-card-info">
					<div className="published-at">
						<Icon id="fa-calendar-o" margin="0px 10px 0 0px" />
						{formattedDate}
					</div>
					<div className="comments-count">
						<Icon id="fa-comment-o" margin="0px 10px 0 0px" />
						{commentsCount}
					</div>
				</div>
			</div>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	width: 290px;
	border: 1px solid #000;
	padding: 5px;
	height: 270px;
	margin: 21.6px;
	transition: box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out;
	&:hover {
		box-shadow: -8px 6px 8px rgba(0, 0, 0, 0.06);
		transform: translateY(-5px);
	}
	h3 {
		margin: 10px 0 0 0;
	}
	& .post-card-footer {
		height: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	& .post-card-info {
		display: flex;
		width: 100%;
		margin: 0 15px;
		justify-content: space-between;
	}
	& .published-at {
		display: flex;
		align-items: center;
	}
	& .comments-count {
		display: flex;
		align-items: center;
	}
`;
PostCard.propTypes = {
	id: PropTypes.string.isRequired,
	imageUrl: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	commentsCount: PropTypes.number.isRequired,
};
