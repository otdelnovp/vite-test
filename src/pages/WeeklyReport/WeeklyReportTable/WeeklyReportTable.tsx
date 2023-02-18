import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';

import TaskInput from '@core/TaskInput/TaskInput';

import { IUserData } from '@helpers/authHelper';
import { getDateStr, getTimeFromMinutes } from '@helpers/dateHelper';
import { delTaskExecutionTime } from '@services/taskService';
import { IUserElement } from '@pages/Dictionary/User/model';

import { initTimeDialog, ITimeDialog } from './TimeDialog/model';
import TimeDialog from './TimeDialog/TimeDialog';
import {
    getWeekArray,
    IExecutionTimeElement,
    initTableElement,
    ISelectedDay,
    ITableElement,
    IWorkExceptionTimeElement,
    prepareTableData,
    taskRowHasTime,
} from './methods';

import { sx, useStyles } from './styles';

interface IExecutionTimeListProps {
    weeklyReportId: string;
    user: IUserData | null;
    workerId: string;
    workerData: IUserElement | null;
    date: string;
    executionTimeList: IExecutionTimeElement[];
    workExceptionTimeList: IWorkExceptionTimeElement[];
    onChange: () => void;
}

const WeeklyReportTable = ({
    weeklyReportId,
    user,
    workerId,
    workerData,
    date,
    executionTimeList,
    workExceptionTimeList,
    onChange,
}: IExecutionTimeListProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useStyles();
    const boxRef = useRef<any>();

    const [editTimeVisible, setEditTimeVisible] = useState(false);

    const [tableData, setTableData] = useState([] as ITableElement[]);
    const [weekDays, setWeekDays] = useState([] as Date[]);
    const [currentDay, setCurrentDay] = useState({} as ISelectedDay);
    const [timeDialogData, setTimeDialogData] = useState({} as ITimeDialog);

    const [currentTask, setCurrentTask] = useState(null as { Id: string; Name: string } | null);

    const onAddTaskClick = () => {
        if (!currentTask) return;
        if (tableData.find((item) => item.TaskId === currentTask.Id)) return;
        const emptyWeekdays = weekDays.map((date) => ({
            Date: moment(date).format('YYYY-MM-DD'),
            Time: 0,
            ExecutionTimes: [],
        }));
        const newTableRow: ITableElement = {
            ...initTableElement,
            TaskId: currentTask.Id,
            TaskName: currentTask.Name,
            Weekdays: [...emptyWeekdays],
        };
        setTableData([...tableData, { ...newTableRow }]);
        setCurrentTask(null);
    };

    const onDeleteTaskClick = (id: string) => {
        setTableData(tableData.filter((item) => item.TaskId !== id));
    };

    const onTableClick = (taskId: string, taskName: string, date: string, executionTimeList: IExecutionTimeElement[]) => {
        setCurrentDay({ taskId, taskName, date, executionTimeList });
    };

    const onEditTimeClick = (taskRow: IExecutionTimeElement) => {
        setTimeDialogData({ ...taskRow, UserId: workerId });
        setEditTimeVisible(true);
    };

    const onAddTimeClick = () => {
        const newDialogData = {
            ...initTimeDialog,
            UserId: workerId,
            TaskId: currentDay.taskId,
            Date: currentDay.date,
        };
        setTimeDialogData({ ...newDialogData });
        setEditTimeVisible(true);
    };

    const onCloseTimeDialog = () => {
        setEditTimeVisible(false);
    };

    const onSaveTimeDialog = (timeData: any) => {
        setEditTimeVisible(false);
        onChange();
    };

    const onDeleteTimeClick = (id: string) => {
        dispatch(delTaskExecutionTime(id, { onSuccess: (res: any) => onChange() }));
    };

    useEffect(() => {
        if (date) {
            setWeekDays(getWeekArray(date));
        }
        if (executionTimeList) {
            setTableData(prepareTableData(user, date, executionTimeList, workExceptionTimeList));
        }
    }, [date]);

    const taskAdderRow = (
        <TableRow>
            <TableCell colSpan={10} sx={{ padding: 0 }}>
                <Box sx={sx.taskAdderBox}>
                    <TaskInput
                        sx={sx.taskAdderInput}
                        name="taskAdder"
                        value={currentTask ? currentTask.Id : null}
                        text={currentTask ? currentTask.Name : undefined}
                        placeholder="Добавить работу"
                        excludeOptions={tableData.map((item) => item.TaskId)}
                        onChange={(value, name) => {
                            if (value) {
                                setCurrentTask({ Id: value, Name: name || '' });
                            } else {
                                setCurrentTask(null);
                            }
                        }}
                        taskFinderFilters={{
                            CompanyId: workerData ? workerData.org_id : null,
                            CompanyName: workerData ? workerData.org_name : null,
                        }}
                    />
                    <Button onClick={onAddTaskClick} variant="outlined" sx={sx.taskAdderBtn}>
                        Добавить
                    </Button>
                </Box>
            </TableCell>
        </TableRow>
    );

    return (
        <React.Fragment>
            <Box
                ref={boxRef}
                sx={{
                    ...sx.reportTable,
                }}
            >
                <Typography variant="h4" sx={sx.reportTableHeader}>
                    Рабочее время по работам
                </Typography>
                <TableContainer className={classes.table}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: '40%' }}>Работа</TableCell>
                                <TableCell sx={{ width: '10%' }}>Тип</TableCell>
                                {weekDays.map((date) => {
                                    return <TableCell sx={{ width: '5%' }}>{moment(date).format('DD.MM')}</TableCell>;
                                })}
                                <TableCell sx={{ width: '5%' }}>Итого</TableCell>
                            </TableRow>
                        </TableHead>
                        {tableData.length ? (
                            <TableBody>
                                {tableData.map((taskRow) => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Box sx={sx.taskCell}>
                                                    {taskRow.Type === 'task' ? `${taskRow.TaskNumber}. ${taskRow.TaskName}` : taskRow.TaskName}
                                                    {!taskRowHasTime(taskRow) && (
                                                        <Tooltip title="Удалить работу">
                                                            <IconButton
                                                                sx={{ margin: '-8px 0' }}
                                                                size={'small'}
                                                                aria-label="next-week"
                                                                onClick={() => onDeleteTaskClick(taskRow.TaskId)}
                                                            >
                                                                <ClearIcon sx={{ color: '#aa0000' }} />
                                                            </IconButton>
                                                        </Tooltip>
                                                    )}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ backgroundColor: taskRow.BgColor }}>
                                                {taskRow.Type === 'task' ? 'Работа' : 'Отсутствие'}
                                            </TableCell>
                                            {taskRow.Weekdays.map((weekDay) => {
                                                const cellSX =
                                                    currentDay.date === weekDay.Date && currentDay.taskId === taskRow.TaskId
                                                        ? { ...sx.selectedDate, ...sx.clickableCell }
                                                        : taskRow.Type === 'task'
                                                        ? sx.clickableCell
                                                        : {};
                                                return (
                                                    <TableCell
                                                        sx={
                                                            weekDay.Time
                                                                ? { ...cellSX, backgroundColor: taskRow.BgColor, fontWeight: 'bold' }
                                                                : cellSX
                                                        }
                                                        onClick={() => {
                                                            taskRow.Type === 'task' &&
                                                                onTableClick(taskRow.TaskId, taskRow.TaskName, weekDay.Date, weekDay.ExecutionTimes);
                                                        }}
                                                    >
                                                        {getTimeFromMinutes(weekDay.Time)}
                                                    </TableCell>
                                                );
                                            })}
                                            <TableCell sx={{ fontWeight: 'bold' }}>{getTimeFromMinutes(taskRow.Time)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {taskAdderRow}
                            </TableBody>
                        ) : (
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={10}>Отчет не заполнен. Выберите работу в поле ниже и нажмите "Добавить".</TableCell>
                                </TableRow>
                                {taskAdderRow}
                            </TableBody>
                        )}
                    </Table>
                </TableContainer>
                {currentDay && currentDay.executionTimeList ? (
                    <Box sx={{ marginTop: '24px' }}>
                        <Typography variant="h4" sx={sx.reportTableHeader}>
                            Работа: {currentDay.taskName} за {getDateStr(currentDay.date)} г.
                        </Typography>
                        <Button onClick={onAddTimeClick} variant="outlined">
                            Добавить время
                        </Button>
                        <TableContainer sx={sx.bottomTable}>
                            <Table>
                                <TableHead>
                                    <TableRow sx={sx.thRow}>
                                        <TableCell sx={{ ...sx.th, width: '80%' }}>Комментарий</TableCell>
                                        <TableCell sx={{ ...sx.th, width: '10%' }}>Время</TableCell>
                                        <TableCell sx={{ ...sx.th, width: '10%' }}></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currentDay.executionTimeList.length ? (
                                        currentDay.executionTimeList.map((taskRow) => {
                                            return (
                                                <TableRow sx={{ ...sx.tRow, '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={sx.clickableCell} onClick={() => onEditTimeClick(taskRow)}>
                                                        {taskRow.Comment}
                                                    </TableCell>
                                                    <TableCell sx={sx.clickableCell} onClick={() => onEditTimeClick(taskRow)}>
                                                        {getTimeFromMinutes(taskRow.Time)}
                                                    </TableCell>
                                                    <TableCell sx={{ textAlign: 'right' }}>
                                                        <ClearIcon
                                                            sx={{ color: '#aa0000', cursor: 'pointer' }}
                                                            onClick={() => onDeleteTimeClick(taskRow.Id)}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>Нажмите "Добавить время", чтобы добавить строку.</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {editTimeVisible && <TimeDialog data={timeDialogData} onClose={onCloseTimeDialog} onSave={onSaveTimeDialog} />}
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </React.Fragment>
    );
};

export default WeeklyReportTable;

