import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { sanitizeContent } from './utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	CLOSE_MODAL,
	RESET_POST_DATA,
	openModal,
	removePostAsync,
	savePostAsync,
} from '../../../../store/actions';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageValue, setImageValue] = useState('');
	const [titleValue, setTitleValue] = useState('');
	const contentRef = useRef(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useLayoutEffect(() => {
		setImageValue(imageUrl || '');
		setTitleValue(title || '');
	}, [title, imageUrl]);
	const onPostSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);
		if (!imageValue || !titleValue || !newContent) {
			alert('Введите данные');
			return;
		}
		dispatch(
			savePostAsync(id, {
				imageUrl: imageValue,
				title: titleValue,
				content: newContent,
			}),
		)
			.then(({ id }) => navigate(`/post/${id}`))
			.catch((error) => {
				alert(`Нет доступа`);
				navigate(`/`);
			});
	};

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
	const onImageChange = useCallback(
		({ target }) => setImageValue(target.value),
		[],
	);
	const onTitleChange = useCallback(
		({ target }) => setTitleValue(target.value),
		[],
	);
	const formattedDate = publishedAt
		? new Date(publishedAt).toLocaleDateString()
		: null;
	return (
		<div className={className}>
			<Input
				name="image"
				value={imageValue || ''}
				placeholder="Изображение..."
				onChange={onImageChange}
			/>
			<Input
				name="title"
				value={titleValue || ''}
				placeholder="Заголовок..."
				onChange={onTitleChange}
			/>
			<div className="special-panel">
				<div className="published-at">
					{publishedAt ? (
						<>
							<Icon id="fa-calendar-o" margin="0px 10px 0 0px" />
							{formattedDate}
						</>
					) : null}
				</div>
				<div className="buttons">
					<Icon
						id="fa-floppy-o"
						size="26px"
						margin="0px 0px 0 0px"
						onClick={onPostSave}
					/>
					{publishedAt ? (
						<Icon
							id="fa-trash-o"
							margin="0px 0px 0 10px"
							onClick={() => onPostRemove(id)}
						/>
					) : null}
				</div>
			</div>
			<div
				style={{ padding: '10px' }}
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
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
		white-space: pre-line;
		border: 1px solid #000;
		min-height: 80px;
	}
	& .published-at {
		display: flex;
		align-items: center;
	}
	& .buttons {
		display: flex;
	}
`;
PostForm.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string,
		title: PropTypes.string,
		imageUrl: PropTypes.string,
		content: PropTypes.string,
		publishedAt: PropTypes.string,
	}),
};
