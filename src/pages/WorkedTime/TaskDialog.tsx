import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';
import UniversalInput from '@core/UniversalInput/UniversalInput';
import LoadingButton from '@core/LoadingButton/LoadingButton';

import { alertActions } from '@services/alertService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { executionTimeEdit, IExecutionTime } from './methods';
import { useStyles } from './styles';

interface ITaskDialogProps {
    editOpen: boolean;
    setEditOpen: (editOpen: boolean) => void;
    userId: string;
    date: string;
    currentExecutionTime: IExecutionTime;
    setCurrentExecutionTime: (newExecutionTime: IExecutionTime) => void;
    executionTimes: IExecutionTime[];
    setTasks: (newTasks: IExecutionTime[]) => void;
    setTasksChanged: (tasksChanged: boolean) => void;
    currentTaskIndex: number;
    isNewTask: boolean;
    setIsNewTask: (isNewTask: boolean) => void;
}

const TaskDialog = ({
    editOpen,
    setEditOpen,
    userId,
    date,
    currentExecutionTime,
    setCurrentExecutionTime,
    executionTimes,
    setTasks,
    setTasksChanged,
    currentTaskIndex,
    isNewTask,
    setIsNewTask,
}: ITaskDialogProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [changed, setChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleTaskChange = (e: any, params?: any) => {
        const { name, value } = e.target;
        if (name === 'Time') {
            setCurrentExecutionTime({ ...currentExecutionTime, [name]: value });
        } else if (name === 'TaskId') {
            setCurrentExecutionTime({ ...currentExecutionTime, TaskId: params.Id, TaskTitle: params.Name, TaskNumber: '' });
        } else {
            setCurrentExecutionTime({ ...currentExecutionTime, [name]: value });
        }
        setChanged(true);
    };

    const handleCurrentTaskSave = () => {
        executionTimeEdit(setIsLoading, userId, date, currentExecutionTime)
            .catch((error) => {
                dispatch(alertActions.alertError({ message: `Ошибка при записи: ${JSON.stringify(error)}` }));
            })
            .then((response) => {
                const newExecutionTime = { ...currentExecutionTime };
                if (typeof response === 'string') {
                    newExecutionTime.Id = response;
                }
                const newTasks = executionTimes.map((executionTime, index) => {
                    if (index === currentTaskIndex) {
                        return { ...newExecutionTime };
                    }
                    return executionTime;
                });
                setTasks(newTasks);
                setTasksChanged(true);
                setEditOpen(false);
            });
    };

    useEffectOnce(() => {
        setChanged(false);
    });

    const handleClose = () => {
        setEditOpen(false);
        if (isNewTask) {
            let newTasks = [...executionTimes];
            newTasks.pop();
            setTasks(newTasks);
            setIsNewTask(false);
        }
    };

    return (
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} fullWidth={true} maxWidth="sm">
            <DialogTitle>Редактирование времени</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <AutocompleteInput
                            name="TaskId"
                            required={true}
                            label="Работа"
                            dictionaryName="tasks"
                            selectProps={{
                                valueField: 'Id',
                                textField: 'Name',
                            }}
                            text={currentExecutionTime.TaskNumber + '. ' + currentExecutionTime.TaskTitle}
                            value={currentExecutionTime.TaskId}
                            onChange={(e, params) => handleTaskChange(e, params)}
                            error={!currentExecutionTime.TaskId}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UniversalInput
                            type="hours"
                            name="Time"
                            label="Время, ч"
                            value={currentExecutionTime.Time}
                            onChange={handleTaskChange}
                            onBlur={(e: any) => handleTaskChange(e)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <UniversalInput name="Comment" label="Комметарий" value={currentExecutionTime.Comment} onChange={handleTaskChange} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose()} variant="outlined">
                    Закрыть
                </Button>
                <LoadingButton
                    type="submit"
                    title={'Сохранить'}
                    disabled={!changed}
                    onClick={handleCurrentTaskSave}
                    className={classes.submitLoadingButton}
                    variant="contained"
                    color="primary"
                    isLoading={isLoading}
                />
            </DialogActions>
        </Dialog>
    );
};

export default TaskDialog;

