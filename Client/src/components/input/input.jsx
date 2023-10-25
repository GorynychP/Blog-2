import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { styled } from 'styled-components';

const InputContainer = forwardRef(
	({ className, width, margin, padding, ...props }, ref) => {
		return <input className={className} {...props} ref={ref} />;
	},
);

export const Input = styled(InputContainer)`
	height: 40px;
	width: ${({ width = '100%' }) => width};
	margin: ${({ margin = '0 0 10px' }) => margin};
	padding: ${({ padding = '10px' }) => padding};
	font-size: 18px;
	border: 1px solid #000;
`;
Input.propTypes = {
	width: PropTypes.string,
	margin: PropTypes.string,
	padding: PropTypes.string,
};
