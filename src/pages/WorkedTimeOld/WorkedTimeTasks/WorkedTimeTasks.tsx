import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Typography } from '@mui/material';

import { IUserData } from '@helpers/authHelper';

import { IWorkedTimeTaskData } from '../methods';
import { sx } from '../styles';
import { useStyles } from './styles';

interface IWorkedTimeTasks {
    user: IUserData | null;
    userName: string;
    date: string;
    taskList: IWorkedTimeTaskData[];
    setTaskList: (newTaskList: IWorkedTimeTaskData[]) => void;
}

const WorkedTimeTasks = ({ user, userName, date, taskList, setTaskList }: IWorkedTimeTasks) => {
    const classes = useStyles();

    return (
        <TableContainer sx={{ width: 'unset' }} className={classes.container}>
            <Typography variant="h6" sx={sx.h6}>
                {userName}: работы за {date}
            </Typography>
            {taskList.length ? (
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow sx={sx.thRow}>
                            <TableCell sx={sx.th}>Работа</TableCell>
                            <TableCell sx={sx.th} align="center">
                                Часы
                            </TableCell>
                            <TableCell sx={sx.th}>Комментарий</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((task) => (
                            <TableRow key={task.Title} sx={{ ...sx.tRow, '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell>{task.Number + '. ' + task.Title}</TableCell>
                                <TableCell align="center">{task.Time}</TableCell>
                                <TableCell>{task.Comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p>Нет работ на выбранную дату.</p>
            )}
        </TableContainer>
    );
};

export default WorkedTimeTasks;
