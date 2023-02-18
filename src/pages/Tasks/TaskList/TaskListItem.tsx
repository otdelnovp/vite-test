import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { IUserData } from '@helpers/authHelper';

import { ITaskListData } from '../methods';
import { useTaskListItemStyles } from '../styles';

export interface ITaskListItem {
    task: ITaskListData;
    user: IUserData | null;
}

export const TaskListItem = ({ task, user }: ITaskListItem) => {
    const classes = useTaskListItemStyles();

    return (
        <Box className={classes.task}>
            <Link className={classes.number} to={`/tasks/view/${task.Id}`}>
                {task.Number}
            </Link>
            <Box className={classes.title}>{task.Title}</Box>
            <Link className={classes.forward} to={`/tasks/view/${task.Id}`}>
                <Tooltip title="Посмотреть работу">
                    <ArrowForwardIosIcon />
                </Tooltip>
            </Link>
        </Box>
    );
};
