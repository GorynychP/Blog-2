import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Input } from '../../../../components';

const SearchComponetnst = ({ className, onChange, searchPhrase }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				placeholder="Поиск..."
				margin="0px"
				padding="10px 40px 10px 10px"
				onChange={onChange}
			/>
			<div className="search-img">
				<Icon
					id="fa-search"
					size="26px"
					margin="0px 0px 0 0px"
					// onClick={onSave}
				/>
			</div>
		</div>
	);
};

export const Search = styled(SearchComponetnst)`
	display: flex;
	width: 340px;
	height: 40px;
	margin: 30px auto 20px;
	position: relative;
	& .search-img {
		position: absolute;
		right: 10px;
		top: 2px;
	}
`;
Search.propTypes = {
	onChange: PropTypes.func.isRequired,
	searchPhrase: PropTypes.string.isRequired,
};
