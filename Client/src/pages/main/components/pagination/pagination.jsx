import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '../../../../components';

const PaginationContainer = ({ className, setPage, page, limitPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">Страница:{page}</div>
			<Button
				disabled={page === limitPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				disabled={page === limitPage}
				onClick={() => setPage(limitPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	& button {
		margin: 0 20px;
		width: 180px;
	}
	& .current-page {
		border: 1px solid #000;
		height: 32px;
		width: 180px;
		display: flex;
		justify-content: center;
		font-weight: 500;
		line-height: 30px;
	}
`;
PaginationContainer.propTypes = {
	setPage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	limitPage: PropTypes.number.isRequired,
};
