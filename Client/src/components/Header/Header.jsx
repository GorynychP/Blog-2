import { styled } from 'styled-components';
import { ControlPanel, Logo } from './components';
const Discription = styled.div`
	font-style: italic;
	font-weight: 500;
`;
const HeaderContainer = ({ className }) => {
	return (
		<header className={className}>
			<Logo />
			<Discription>
				Веб-технологии
				<br />
				Написание кода
				<br /> Разбор ошибок
			</Discription>
			<ControlPanel />
		</header>
	);
};
export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px #000;
	z-index: 50;
`;
