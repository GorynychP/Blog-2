import { styled } from 'styled-components';
import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserRole, selectorUserLogin } from '../../../../selectors';
import { RESET_POST_DATA, logout } from '../../../../store/actions';
import { checkAccess } from '../../../utils/check-access';
const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const roleId = useSelector(selectorUserRole);
	const login = useSelector(selectorUserLogin);
	const dispatch = useDispatch();
	const isAdimin = checkAccess([ROLE.ADMIN], roleId);

	const logautAndNavigate = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
		navigate('/');
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Link to="/login">
						<Button width={'100px'}>Войти</Button>
					</Link>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							onClick={logautAndNavigate}
							id="fa-sign-out"
							margin="0px 0 0px 10px"
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					onClick={() => navigate(-1)}
					id="fa-backward"
					margin="10px 0 0 0px"
				/>
				{isAdimin && (
					<>
						<Link to="/post">
							<Icon
								id="fa-file-text"
								margin="10px 0 0 14px"
								onClick={() => {
									dispatch(RESET_POST_DATA);
								}}
							/>
						</Link>
						<Link to="/users">
							<Icon
								id="fa-users"
								margin="10px 0 0 14px"
								onClick={() => {}}
							/>
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};
export const ControlPanel = styled(ControlPanelContainer)``;
