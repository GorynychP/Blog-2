import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { PostCard } from './components/post-card/post-card';
import { PAGINATION_LIMIT } from '../../components/constants';
import { Pagination } from './components/pagination/pagination';
import { debounce, getLastPageFromLink } from './utils';
import { Search } from './components';
import { request } from '../../components/utils/request';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [limitPage, setLimitPage] = useState(1);
	const [isLoading, setIsLoading] = useState(true);
	const [searchPhrase, setSearchPhrase] = React.useState('');
	const [shouldSearch, setShouldSearch] = React.useState(false);
	useEffect(() => {
		request(
			`/posts?search=${searchPhrase.trim()}&page=${page}&limit=${PAGINATION_LIMIT}`,
		).then(({ data: { posts, lastPage } }) => {
			setPosts(posts);
			setLimitPage(lastPage);
			setIsLoading(false);
			window.scroll(0, 0);
		});
	}, [page, searchPhrase, shouldSearch]);

	const startDelayedSearch = useMemo(
		() => debounce(setShouldSearch, 1500),
		[],
	);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch, setPage);
		setTimeout(() => setPage(1), 1500);
	};
	return (
		<div className={className}>
			<Search onChange={onSearch} searchPhrase={searchPhrase} />
			<div className="post-list">
				{posts.length ? (
					posts.map(
						({ id, imageUrl, title, publishedAt, comments }) => (
							<PostCard
								key={id}
								id={id}
								imageUrl={imageUrl}
								title={title}
								publishedAt={publishedAt}
								commentsCount={comments.length}
							/>
						),
					)
				) : isLoading ? null : (
					<div className="not-found-post">
						<h2>Такого поста нет</h2>{' '}
					</div>
				)}
			</div>

			{limitPage > 0 && (
				<div className="pagination">
					<Pagination
						page={page}
						setPage={setPage}
						limitPage={limitPage}
					/>
				</div>
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	min-height: 600px;
	padding-bottom: 60px;
	position: relative;
	& .post-list {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
	}
	& .not-found-post {
		margin: 0 auto 350px;
	}
	& .pagination {
		position: absolute;
		bottom: 0;
		width: 100%;
	}
`;
