import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const TableRowContainer = ({ className, children }) => {
	return <div className={className}>{children}</div>;
};

export const TableRow = styled(TableRowContainer)`
	display: flex;
	align-items: center;
	padding: 4px;
	border: ${({ border }) => (border ? '1px solid #000' : 'none')};
	width: 565px;
	& > div {
		padding: 0 10px;
		display: flex;
	}
	& .login-column {
		width: 172px;
	}
	& .registered-at-column {
		width: 213px;
	}
	& .role-column {
		width: auto;
	}
`;
TableRow.propTypes = {
	children: PropTypes.node.isRequired,
};
