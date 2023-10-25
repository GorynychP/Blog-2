import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from 'styled-components';
import { AuthFormError, Button, Input } from '../../components';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/actions';
import { selectorUserRole } from '../../selectors';
import { useResetForm } from '../../hooks';
import { request } from '../../components/utils/request';
import { ROLE } from '../../components/constants';
const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполнить логин')
		.matches(/^\w+$/, 'Неверный логин. Допускаются только буквы и цифры')
		.min(4, 'Неверный логин. Минимум 4 символа')
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
	passcheck: yup
		.string()
		.required('Заполнить повтор пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
	const [serverError, setServerError] = useState(null);
	const roleId = useSelector(selectorUserRole);
	const dispatch = useDispatch();
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '', passcheck: '' },
		resolver: yupResolver(regFormSchema),
	});

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request('/register', 'POST', { login, password }).then(
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

	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;
	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}
	return (
		<div className={className}>
			<h2>Регистрация</h2>
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
				<Input
					type="password"
					placeholder="Повтор пороля..."
					{...register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	align-items: center;
	flex-direction: column;
	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
