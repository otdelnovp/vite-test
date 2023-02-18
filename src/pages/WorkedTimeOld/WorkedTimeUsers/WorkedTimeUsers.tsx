import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { IUserData } from '@helpers/authHelper';

import { IWorkedTimeUserData } from '../methods';
import { sx } from '../styles';
import { useStyles } from './styles';

interface IWorkedTimeUsers {
    user: IUserData | null;
    userList: IWorkedTimeUserData[];
    selectedUser: string;
    setSelectedUser: (newSelectedUser: string) => void;
}

const WorkedTimeUsers = ({ user, userList, selectedUser, setSelectedUser }: IWorkedTimeUsers) => {
    const classes = useStyles();

    const handleClick = (userId: string) => {
        setSelectedUser(userId)
    }

    return (
        <TableContainer sx={{ width: 'unset' }} className={classes.container}>
            <Typography variant='h6' sx={sx.h6}>Сотрудники</Typography>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow sx={sx.thRow}>
                        <TableCell sx={sx.th}>Сотрудник</TableCell>
                        <TableCell sx={sx.th} align="right">Часы</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userList.map((row) => (
                        <TableRow
                            selected={row.UserId === selectedUser}
                            key={row.UserName}
                            sx={{ ...sx.tRow, '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={() => { handleClick(row.UserId) }}
                        >
                            <TableCell>{row.UserName}</TableCell>
                            <TableCell align="right">{row.Time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WorkedTimeUsers;