import { AuthFormError, Button, Input } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ROLE } from '../../components/constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from 'styled-components';
import { setUser } from '../../store/actions';
import { selectorUserRole } from '../../selectors';
import { useResetForm } from '../../hooks';
import { request } from '../../components/utils/request';
const authFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполнить логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(3, 'Неверный логин. Минимум 3 символа')
		.max(15, 'Неверный логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполнить пароль')
		.matches(
			/^[\w#%/]+/,
			'Неверный пароль. Допускаются буквы, цифры и знаки # %',
		)
		.min(6, 'Неверный заполнен пароль. Минимум 6 символа')
		.max(20, 'Неверный заполнен пароль. Максимум 20 символов'),
});
const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	margin: 20px 0;
	font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectorUserRole);
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/login', 'POST', { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}
				dispatch(setUser(user));
				sessionStorage.setItem('userData', JSON.stringify(user));
			},
		);
	};

	const formError = errors?.login?.message || errors?.password?.message;
	const errorMessage = formError || serverError;
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<div className={className}>
			<h2>Авторизация</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type={'text'}
					placeholder={'Логин...'}
					{...register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Войти
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/register">
					<div>Регистрация</div>
				</StyledLink>
			</form>
		</div>
	);
};

export const Authorization = styled(AuthorizationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
