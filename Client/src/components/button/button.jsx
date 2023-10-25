import PropTypes from 'prop-types';
import { styled } from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #000;
	background-color: #eee;
	font-size: 18px;
	width: ${({ width = '100%' }) => width};
	height: 32px;
`;
Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
