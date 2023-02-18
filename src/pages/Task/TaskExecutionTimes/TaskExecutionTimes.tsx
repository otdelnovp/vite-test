import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../../index';
import { compose } from 'redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

import { getDateStr, getDateTimeStr, getTimeFromMinutes } from '@helpers/dateHelper';
import { RootState } from '@services/index';
import { userSelector } from '@services/userService';
import { taskSelector, getTask, editTaskExecutionTime } from '@services/taskService';

import { prepareExecutionTimeData } from './methods';

import { useExecutionTimeStyles } from './styles';
import UniversalInput from '@core/UniversalInput/UniversalInput';
import { Grid } from '@mui/material';

const TaskExecutionTimes = ({ user, executionTimeList, task }: TaskExecutionTimesReduxProps) => {
    const classes = useExecutionTimeStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [editExecutionTimeId, setEditExecutionTimeId] = useState('');
    const [executionTimeValue, setExecutionTimeValue] = useState(0);
    const [executionTimeComment, setExecutionTimeComment] = useState('');

    const onAddExecutionTime = () => {
        if (task && task.Id)
            dispatch(
                editTaskExecutionTime(prepareExecutionTimeData(editExecutionTimeId, executionTimeValue, executionTimeComment, task.Id, user), {
                    onSuccess: () => {
                        // if (task && task.Id) dispatch(getTaskExecutionTimeList(task.Id));
                        if (task && task.Id) dispatch(getTask(task.Id));
                        setEditExecutionTimeId('');
                        setExecutionTimeValue(0);
                        setExecutionTimeComment('');
                    },
                }),
            );
    };

    const executionTimeForm = (
        <Box className={classes.executionTimeForm} style={!executionTimeList?.length || editExecutionTimeId ? { paddingLeft: 0 } : undefined}>
            <Grid container spacing={2}>
                <Grid item xs={2}>
                    <UniversalInput
                        type="hours"
                        name="PlannedTime"
                        value={executionTimeValue}
                        onChange={(event: any) => setExecutionTimeValue(event.target.value)}
                        onBlur={(event: any) => setExecutionTimeValue(event.target.value)}
                    />
                </Grid>
                <Grid item xs={9}>
                    <UniversalInput
                        name="ExecutionTime"
                        placeholder="Комментарий..."
                        value={executionTimeComment}
                        onChange={(event: any) => setExecutionTimeComment(event.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" size="small" onClick={onAddExecutionTime} disabled={!executionTimeValue}>
                        {!editExecutionTimeId ? 'Списать часы' : 'Сохранить изменение'}
                    </Button>{' '}
                    {!!editExecutionTimeId ? (
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => {
                                setEditExecutionTimeId('');
                                setExecutionTimeValue(0);
                                setExecutionTimeComment('');
                            }}
                        >
                            Отменить
                        </Button>
                    ) : null}
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Box className={classes.executionTimes}>
            {executionTimeList && executionTimeList.length ? (
                <Box className={classes.executionTimeList}>
                    {executionTimeList.map((executionTime) => (
                        <Box className={classes.executionTimeItem} key={executionTime.Id}>
                            <Box className={classes.executionTimeItemIcon}>🕑</Box>
                            <Box className={classes.executionTimeInfo}>
                                <Box className={classes.executionTimeDate}>
                                    {getDateTimeStr(executionTime.CreateDate)}
                                    {executionTime.CreateDate !== executionTime.ModifyDate && executionTime.ModifyDate ? (
                                        <i> (изменено: {getDateTimeStr(executionTime.ModifyDate)})</i>
                                    ) : (
                                        ''
                                    )}
                                </Box>
                                <Box className={classes.executionTimeUserName}>
                                    {executionTime.UserFullName}
                                    {executionTime.UserId === user?.UserId ? (
                                        <>
                                            <EditIcon
                                                className={classes.executionTimeEditIcon}
                                                fontSize="small"
                                                onClick={() => {
                                                    setEditExecutionTimeId(executionTime.Id || '');
                                                    setExecutionTimeValue(executionTime.Time);
                                                    setExecutionTimeComment(executionTime.Comment || '');
                                                }}
                                            />
                                            {editExecutionTimeId === executionTime.Id ? (
                                                <ClearIcon
                                                    className={classes.executionTimeEditIcon}
                                                    fontSize="small"
                                                    onClick={() => {
                                                        setEditExecutionTimeId('');
                                                        setExecutionTimeValue(0);
                                                        setExecutionTimeComment('');
                                                    }}
                                                />
                                            ) : null}
                                        </>
                                    ) : null}
                                </Box>
                            </Box>
                            {editExecutionTimeId === executionTime.Id ? (
                                executionTimeForm
                            ) : (
                                <>
                                    <Box className={classes.executionTimeContent}>
                                        {getTimeFromMinutes(executionTime.Time)} <span>за {getDateStr(executionTime.Date)}</span>
                                    </Box>
                                    {executionTime.Comment && (
                                        <Box className={classes.executionTimeComment}>&laquo;{executionTime.Comment}&raquo;</Box>
                                    )}
                                </>
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box className={classes.executionTimeList}>По данной заявке еще нет списаний часов</Box>
            )}
            {!editExecutionTimeId ? executionTimeForm : null}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { executionTimeList, task } = taskSelector(state);
    return { user, executionTimeList, task };
};

const connector = connect(mapStateToProps);
type TaskExecutionTimesReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(TaskExecutionTimes);
