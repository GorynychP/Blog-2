import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Error, Footer, Header, Modal } from './components';
import { Authorization, Main, Post, Registration, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/actions';
import { ERROR } from './components/constants/error';

const Pages = styled.div`
	max-height: 100%;
	text-align: center;
	padding: 120px 0 40px 0;
`;
const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	margin: 0 auto;
	background-color: #ffffff;
`;

export const Blog = () => {
	const dispatch = useDispatch();
	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');
		if (!currentUserDataJSON) {
			return;
		}
		const currentUserData = JSON.parse(currentUserDataJSON);
		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Pages className="App">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registration />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<Post />} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="/post/:id/edit" element={<Post />} />
					<Route
						path="*"
						element={<Error error={ERROR.PAGE_NOT_EXIST} />}
					/>
				</Routes>
			</Pages>
			<Footer />
			<Modal />
		</AppColumn>
	);
};
