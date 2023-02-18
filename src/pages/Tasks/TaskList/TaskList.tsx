import React from 'react';

import Box from '@mui/material/Box';
import { Loader } from '@core/Loader/Loader';

import { TaskListItem } from './TaskListItem';

import { IUserData } from '@helpers/authHelper';
import { ITaskListData } from '../methods';
import { useTaskListStyles } from '../styles';

export interface ITaskList {
    tasks: ITaskListData[] | null;
    isLoading: boolean;
    user: IUserData | null;
}

export const TaskList = ({ tasks, isLoading, user }: ITaskList) => {
    const classes = useTaskListStyles();
    return isLoading ? (
        <Loader />
    ) : tasks?.length ? (
        <Box className={classes.list}>
            {tasks.map((task) => (
                <TaskListItem task={task} key={task.Id} user={user} />
            ))}
        </Box>
    ) : (
        <Box>Работы не найдены</Box>
    );
};
