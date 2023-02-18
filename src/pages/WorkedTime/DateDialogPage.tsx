import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DialogPage from '@core/DialogPage/DialogPage';

import { alertActions } from '@services/alertService';
import { stringToMoment } from '@helpers/dateHelper';

import { ITaskFinderFilters } from '@pages/Tasks/TaskFinder/methods';

import { defaultWorkedTimeTask, IWorkedTimeSelectedDate, IExecutionTime, executionTimeEdit, executionTimeDelete } from './methods';
import DateDialogHeader from './DateDialogHeader/DateDialogHeader';
import TaskTimeEditRow from './TaskTimeEditRow/TaskTimeEditRow';
import { sx, useStyles } from './styles';

interface IDateDialog {
    taskFinderFilter: ITaskFinderFilters;
    selectedDate: IWorkedTimeSelectedDate;
    setSelectedDate: (newSelectedDate: IWorkedTimeSelectedDate | null) => void;
    onChangeDate: (newSelectedDate: IWorkedTimeSelectedDate | null) => void;
}

const DateDialogPage = ({ taskFinderFilter, selectedDate, setSelectedDate, onChangeDate }: IDateDialog) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useState([] as IExecutionTime[]);
    const [tasksChanged, setTasksChanged] = useState(false);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(-1);
    const [currentTask, setCurrentTask] = useState({} as IExecutionTime);

    const [newTask, setNewTask] = useState({} as IExecutionTime);

    useEffect(() => {
        setTasks([...selectedDate.ExecutionTimes]);
    }, [selectedDate]);

    const onClose = () => {
        setSelectedDate(null);
    };

    const handleEditClick = (task: IExecutionTime, taskIndex: number) => {
        setCurrentTaskIndex(taskIndex);
        setCurrentTask(task);
    };

    const handleDeleteClick = (task: IExecutionTime, taskIndex: number) => {
        executionTimeDelete(setIsLoading, task.Id)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи: ${JSON.stringify(error)}` }));
            })
            .then(() => {
                setCurrentTaskIndex(-1);
                setCurrentTask({} as IExecutionTime);
                const newTasks = [...tasks];
                newTasks.splice(taskIndex, 1);
                setTasks(newTasks);
                setTasksChanged(true);

                let newTime = 0;
                newTasks.forEach((task) => (newTime = newTime + task.Time));
                const newSelectedDate = { ...selectedDate, Time: newTime, ExecutionTimes: [...newTasks] };
                onChangeDate(newSelectedDate);
            });
    };

    const handleAddClick = () => {
        executionTimeEdit(setIsLoading, selectedDate.UserInfo.UserId, selectedDate.Date, newTask)
            .then((response) => {
                const newTasks = [...tasks, { ...newTask }];
                setTasks(newTasks);

                let newTime = 0;
                newTasks.forEach((task) => (newTime = newTime + task.Time));
                const newSelectedDate = { ...selectedDate, Time: newTime, ExecutionTimes: [...newTasks] };
                setNewTask({ ...defaultWorkedTimeTask });

                onChangeDate(newSelectedDate);
            })
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи: ${error}` }));
            });
    };

    const handleNewTaskChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'Task') {
            setNewTask({ ...newTask, TaskId: value.Id, TaskTitle: value.Title, TaskNumber: value.Number });
        } else {
            setNewTask({ ...newTask, [name]: value });
        }
    };

    const handleTaskChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'Task') {
            setCurrentTask({ ...currentTask, TaskId: value.Id, TaskTitle: value.Title, TaskNumber: value.Number });
        } else {
            setCurrentTask({ ...currentTask, [name]: value });
        }
    };

    const handleEditCancel = (e: any) => {
        setCurrentTask({} as IExecutionTime);
        setCurrentTaskIndex(-1);
    };

    const handleTaskSave = (task: IExecutionTime, taskIndex: number) => {
        executionTimeEdit(setIsLoading, selectedDate.UserInfo.UserId, selectedDate.Date, currentTask)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи: ${JSON.stringify(error)}` }));
            })
            .then((response) => {
                const newTasks = tasks.map((item, index) => {
                    if (index === taskIndex) {
                        return currentTask;
                    }
                    return item;
                });
                setTasks(newTasks);

                let newTime = 0;
                newTasks.forEach((task) => (newTime = newTime + task.Time));
                const newSelectedDate = { ...selectedDate, Time: newTime, ExecutionTimes: [...newTasks] };
                onChangeDate(newSelectedDate);

                setCurrentTask({} as IExecutionTime);
                setCurrentTaskIndex(-1);
            });
    };

    return (
        <DialogPage>
            <DateDialogHeader
                title={`${selectedDate.UserInfo.UserName}: работы за ${stringToMoment(selectedDate.Date).format('DD.MM.YYYY')} г.`}
                onClose={onClose}
            />
            <Paper sx={sx.dateDialogPaper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer sx={{ width: 'unset' }}>
                            <Table aria-label="simple table" sx={sx.dateDialogTable}>
                                <TableHead>
                                    <TableRow sx={sx.thRow}>
                                        <TableCell sx={sx.th}>Работа</TableCell>
                                        <TableCell sx={sx.th} align="center">
                                            Часы
                                        </TableCell>
                                        <TableCell sx={sx.th}>Комментарий</TableCell>
                                        <TableCell sx={sx.thButtons}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tasks.map((task, taskIndex) => {
                                        if (taskIndex === currentTaskIndex) {
                                            return (
                                                <TaskTimeEditRow
                                                    task={currentTask}
                                                    taskIndex={taskIndex}
                                                    isNew={false}
                                                    taskFinderFilter={taskFinderFilter}
                                                    onTaskChange={handleTaskChange}
                                                    onSaveClick={handleTaskSave}
                                                    onCancelClick={handleEditCancel}
                                                />
                                            );
                                        }
                                        return (
                                            <TaskTimeEditRow
                                                task={task}
                                                taskIndex={taskIndex}
                                                isNew={false}
                                                readOnly={true}
                                                taskFinderFilter={taskFinderFilter}
                                                onEditClick={handleEditClick}
                                                onDeleteClick={handleDeleteClick}
                                            />
                                        );
                                    })}
                                    <TaskTimeEditRow
                                        task={newTask}
                                        taskIndex={tasks.length}
                                        isNew={true}
                                        taskFinderFilter={taskFinderFilter}
                                        onTaskChange={handleNewTaskChange}
                                        onAddClick={handleAddClick}
                                    />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
        </DialogPage>
    );
};

export default DateDialogPage;

