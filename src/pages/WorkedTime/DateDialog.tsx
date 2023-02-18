import React, { useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

import { stringToMoment } from '@helpers/dateHelper';

import TaskDialog from './TaskDialog';
import { defaultWorkedTimeTask, IWorkedTimeSelectedDate, IExecutionTime } from './methods';
import { sx, useStyles } from './styles';

interface IDateDialog {
    selectedDate: IWorkedTimeSelectedDate;
    setSelectedDate: (newSelectedDate: IWorkedTimeSelectedDate | null) => void;
    onChangeDate: (newSelectedDate: IWorkedTimeSelectedDate | null) => void;
}

const DateDialog = ({ selectedDate, setSelectedDate, onChangeDate }: IDateDialog) => {
    const classes = useStyles();

    const [isErrorMessage, setIsErrormessage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [tasks, setTasks] = useState([] as IExecutionTime[]);
    const [tasksChanged, setTasksChanged] = useState(false);

    const [editOpen, setEditOpen] = useState(false);

    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentTask, setCurrentTask] = useState({} as IExecutionTime);

    const [isNewTask, setIsNewTask] = useState(false);

    useEffect(() => {
        setTasks([...selectedDate.ExecutionTimes]);
    }, [selectedDate]);

    const onClose = () => {
        setSelectedDate(null);
    };

    const handleSubmit = () => {
        let newTime = 0;
        tasks.forEach((task) => (newTime = newTime + task.Time));
        const newSelectedDate = { ...selectedDate, Time: newTime, ExecutionTimes: [...tasks] };
        setSelectedDate(null);
        onChangeDate(newSelectedDate);
    };

    const handleEditClick = (task: IExecutionTime, taskIndex: number) => {
        setCurrentTaskIndex(taskIndex);
        setCurrentTask(task);
        setEditOpen(true);
    };

    const handleDeleteClick = (taskIndex: number) => {
        setCurrentTaskIndex(0);
        setCurrentTask({} as IExecutionTime);
        const newTasks = [...tasks];
        newTasks.splice(taskIndex, 1);
        setTasks(newTasks);
        setTasksChanged(true);
    };

    const handleAddClick = () => {
        setCurrentTaskIndex(tasks.length);
        const newTasks = [...tasks, { ...defaultWorkedTimeTask }];
        setTasks(newTasks);
        setCurrentTask({ ...defaultWorkedTimeTask });
        setIsNewTask(true);
        setEditOpen(true);
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="md">
            <DialogTitle>
                <Typography variant="h3">
                    {selectedDate.UserInfo.UserName}: работы за {stringToMoment(selectedDate.Date).format('DD.MM.YYYY')} г.
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TableContainer sx={{ width: 'unset' }}>
                            {tasks.length ? (
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow sx={sx.thRow}>
                                            <TableCell sx={sx.th}>Работа</TableCell>
                                            <TableCell sx={sx.th} align="center">
                                                Часы
                                            </TableCell>
                                            <TableCell sx={sx.th}>Комментарий</TableCell>
                                            <TableCell sx={sx.th}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tasks.map(
                                            (task, taskIndex) =>
                                                // <TableRow
                                                //     key={task.TaskTitle}
                                                //     sx={{ ...sx.tRow, '&:last-child td, &:last-child th': { border: 0 } }}
                                                // >
                                                //     <TableCell>{task.TaskNumber ? task.TaskNumber + ". " + task.TaskTitle : task.TaskTitle}</TableCell>
                                                //     <TableCell align="center">
                                                //         {getHoursMaskByMinutes(task.Time)}
                                                //     </TableCell>
                                                //     <TableCell>{task.Comment}</TableCell>
                                                //     <TableCell sx={sx.tCellEdit}>
                                                //         <Tooltip title="Удалить">
                                                //             <ClearIcon sx={{ color: '#aa0000' }} className={classes.listAction} onClick={() => handleDeleteClick(taskIndex)} />
                                                //         </Tooltip>
                                                //         <Tooltip title="Редактировать">
                                                //             <EditIcon className={classes.listAction} onClick={() => handleEditClick(task, taskIndex)} />
                                                //         </Tooltip>

                                                //     </TableCell>
                                                // </TableRow>
                                                null,
                                        )}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p>Нет работ на выбранную дату.</p>
                            )}
                        </TableContainer>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAddClick} variant="outlined">
                    + Добавить работу
                </Button>
                <Button onClick={handleSubmit} variant="outlined">
                    Закрыть
                </Button>
                {/* <Button onClick={handleSubmit} disabled={!tasksChanged} variant="contained">
                Сохранить
            </Button> */}
            </DialogActions>
            <TaskDialog
                editOpen={editOpen}
                setEditOpen={setEditOpen}
                userId={selectedDate.UserInfo.UserId}
                date={selectedDate.Date}
                currentExecutionTime={currentTask}
                setCurrentExecutionTime={setCurrentTask}
                executionTimes={tasks}
                setTasks={setTasks}
                setTasksChanged={setTasksChanged}
                currentTaskIndex={currentTaskIndex}
                isNewTask={isNewTask}
                setIsNewTask={setIsNewTask}
            />
        </Dialog>
    );
};

export default DateDialog;
