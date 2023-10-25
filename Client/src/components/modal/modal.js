import React from 'react';
import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectorModalCancel,
	selectorModalConfirm,
	selectorModalIsOpen,
	selectorModalText,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const text = useSelector(selectorModalText);
	const isOpen = useSelector(selectorModalIsOpen);
	const onCancel = useSelector(selectorModalCancel);
	const onConfirm = useSelector(selectorModalConfirm);

	if (!isOpen) {
		return null;
	}
	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						{' '}
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						{' '}
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;

	& .overlay {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.7);
		width: 100%;
		height: 100%;
	}
	& .box {
		position: relative;
		background-color: white;
		width: 400px;
		text-align: center;
		padding: 5px 10px 10px 10px;
		margin: auto;
		top: 50%;
		transform: translate(0, -50%);
		border: 2px solid #000;
		z-index: 30;
		height: 122px;
	}
	& .buttons {
		display: flex;
		justify-content: space-evenly;
	}
`;
