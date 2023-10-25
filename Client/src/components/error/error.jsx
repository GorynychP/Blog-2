import PropTypes from 'prop-types';
import { styled } from 'styled-components';
import { PROP_TYPE } from '../constants';
const Div = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
`;
export const Error = ({ error }) =>
	error && (
		<Div>
			<h2>Ошибка</h2>
			<div>{error}</div>
		</Div>
	);
Error.propTypes = {
	error: PROP_TYPE.ERROR,
};
