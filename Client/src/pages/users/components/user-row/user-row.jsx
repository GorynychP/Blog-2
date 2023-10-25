import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { PROP_TYPE } from '../../../../components/constants';
import { request } from '../../../../components/utils/request';

const UserRowContainer = ({
	className,
	id,
	login,
	registeredAt,
	roleId: userRoleId,
	roles,
	onRemoveUser,
}) => {
	const formattedDate = new Date(registeredAt).toLocaleDateString();
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};
	const onRoleSave = (userId, newUserRoleId) => {
		request(`/users/${userId}`, 'PATCH', { roleId: newUserRoleId }).then(
			() => {
				setInitialRoleId(newUserRoleId);
			},
		);
	};
	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border>
				<div className="login-column">{login}</div>
				<div className="registered-at-column">{formattedDate}</div>
				<div className="role-column">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					></Icon>
				</div>
			</TableRow>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onRemoveUser}
			></Icon>
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	width: 565px;
	margin: 10px;
`;
UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PropTypes.number.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onRemoveUser: PropTypes.func.isRequired,
};
