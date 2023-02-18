import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Tooltip from '@mui/material/Tooltip';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import CheckIcon from '@mui/icons-material/Check';

import UniversalInput from '@core/UniversalInput/UniversalInput';
import ConfirmDialog from '@core/ConfirmDialog/ConfirmDialog';

import { getHoursMaskByMinutes } from '@helpers/dateHelper';

import TaskFinder from '@pages/Tasks/TaskFinder/TaskFinder';
import { IExecutionTime } from '../methods';
import { ITaskFinderFilters } from '@pages/Tasks/TaskFinder/methods';
import { useStyles } from '../styles';
import { sx } from './styles';

interface ITaskTimeEditRowProps {
    task: IExecutionTime;
    taskIndex: number;
    isNew: boolean;
    readOnly?: boolean;
    taskFinderFilter: ITaskFinderFilters;
    onTaskChange?: (e: any) => void;
    onAddClick?: () => void;
    onEditClick?: (task: IExecutionTime, taskIndex: number) => void;
    onDeleteClick?: (task: IExecutionTime, taskIndex: number) => void;
    onSaveClick?: (task: IExecutionTime, taskIndex: number) => void;
    onCancelClick?: (taskIndex: number) => void;
}

const TaskTimeEditRow = ({
    task,
    taskIndex,
    isNew,
    readOnly,
    taskFinderFilter,
    onTaskChange,
    onAddClick,
    onSaveClick,
    onEditClick,
    onDeleteClick,
    onCancelClick,
}: ITaskTimeEditRowProps) => {
    const classes = useStyles();

    const [taskFinder, openTaskFinder] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const onDeleteConfirm = () => {
        setIsDeleteDialogOpen(false);
        onDeleteClick && onDeleteClick(task, taskIndex);
    };

    if (readOnly)
        return (
            <TableRow key={task.TaskTitle} sx={{ ...sx.tRowReadOnly, '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{task.TaskNumber ? task.TaskNumber + '. ' + task.TaskTitle : task.TaskTitle}</TableCell>
                <TableCell align="center">{getHoursMaskByMinutes(task.Time)}</TableCell>
                <TableCell>{task.Comment}</TableCell>
                <TableCell sx={sx.tCellEdit}>
                    {isDeleteDialogOpen ? (
                        <ConfirmDialog
                            title="Подтвердите удаление"
                            confirmTitle="Удалить"
                            onClose={() => setIsDeleteDialogOpen(false)}
                            onConfirm={onDeleteConfirm}
                        >
                            <Typography gutterBottom variant="subtitle2">
                                Вы точно хотите удалить запись об отработанном по работе времени?
                            </Typography>
                            <Typography gutterBottom variant="subtitle1">
                                {task.TaskNumber}. {task.TaskTitle}
                            </Typography>
                            <div>
                                отработанное время: <b>{getHoursMaskByMinutes(task.Time)}</b>
                            </div>
                            {task.Comment ? (
                                <div>
                                    комментарий: <i>{task.Comment}</i>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </ConfirmDialog>
                    ) : null}
                    <Tooltip arrow title="Удалить">
                        <DeleteForeverIcon color="error" className={classes.listAction} onClick={() => setIsDeleteDialogOpen(true)} />
                    </Tooltip>
                    <Tooltip arrow title="Редактировать">
                        <EditIcon className={classes.listAction} onClick={() => onEditClick && onEditClick(task, taskIndex)} />
                    </Tooltip>
                </TableCell>
            </TableRow>
        );

    return (
        <TableRow key={`task_row_${task.Id}`} sx={{ ...sx.tRow, '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell>
                <Link to="/worked-time" onClick={() => openTaskFinder(true)}>
                    {task.TaskId ? `${task.TaskNumber}. ${task.TaskTitle}` : 'Нажмите здесь, чтобы выбрать работу'}
                </Link>
                {taskFinder ? (
                    <TaskFinder
                        onSelect={(selectedTask) => onTaskChange && onTaskChange({ target: { name: 'Task', value: selectedTask } })}
                        onClose={() => openTaskFinder(false)}
                        initFilters={taskFinderFilter}
                    />
                ) : null}
            </TableCell>
            <TableCell sx={sx.timeCell}>
                <UniversalInput
                    type="hours"
                    name="Time"
                    value={task.Time}
                    onChange={(e: any) => onTaskChange && onTaskChange(e)}
                    onBlur={(e: any) => onTaskChange && onTaskChange(e)}
                    sx={sx.timeTextField}
                />
            </TableCell>
            <TableCell sx={sx.commentCell}>
                <UniversalInput
                    name="Comment"
                    value={task.Comment}
                    onChange={(e: any) => onTaskChange && onTaskChange(e)}
                    onBlur={(e: any) => onTaskChange && onTaskChange(e)}
                    sx={sx.commentTextField}
                />
            </TableCell>
            {isNew ? (
                <TableCell sx={sx.tCellEdit}>
                    {task.Time && task.TaskId ? (
                        <Tooltip arrow title="Добавить">
                            <AddBoxIcon color="success" className={classes.listAction} onClick={() => onAddClick && onAddClick()} />
                        </Tooltip>
                    ) : (
                        <Tooltip arrow title="Для добавления отработанного времени укажите работу и часы работы по ней.">
                            <AddBoxIcon color="disabled" className={classes.listAction} />
                        </Tooltip>
                    )}
                </TableCell>
            ) : (
                <TableCell sx={sx.tCellEdit}>
                    <Tooltip arrow title="Отменить изменения">
                        <ClearIcon color="primary" className={classes.listAction} onClick={() => onCancelClick && onCancelClick(taskIndex)} />
                    </Tooltip>
                    <Tooltip arrow title="Сохранить">
                        <CheckIcon color="success" className={classes.listAction} onClick={() => onSaveClick && onSaveClick(task, taskIndex)} />
                    </Tooltip>
                </TableCell>
            )}
        </TableRow>
    );
};

export default TaskTimeEditRow;

