import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';
import sanitizeHtml from 'sanitize-html';
import ReactQuill from 'react-quill';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import SaveAsIcon from '@mui/icons-material/SaveAs';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';
import { Columns } from '@core/Columns/Columns';
import UniversalInput from '@core/UniversalInput/UniversalInput';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import { DateRangePicker } from '@core/DatePicker/DateRangePicker';

import { MuiTabs } from '@core/Tabs/MuiTabs';
import { IMuiTab } from '@core/Tabs/methods';

import TaskFiles from './TaskFiles/TaskFiles';
import TaskComments from './TaskComments/TaskComments';
import TaskExecutionTimes from './TaskExecutionTimes/TaskExecutionTimes';
import TaskParticipants from './TaskParticipants/TaskParticipants';

import { emptyTaskData, ITaskData } from '@pages/Tasks/methods';
import { quillConfig, prepareToSaveTask } from './methods';
import { userSelector } from '@services/userService';
import { RootState } from '@services/index';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { getDepartments, getCompanyUsers, getProjects, getTaskSprints, getBoardStates } from '@services/dictionaryService';
import { getTask, editTask, resetTask, taskSelector } from '@services/taskService';
import { getDateTimeStr, getDateStr, getTimeFromMinutes } from '@helpers/dateHelper';
import { taskPriorities } from '@helpers/dictionariesHelper';

import { useTaskStyles } from './styles';
import clsx from 'clsx';

export interface ITask {
    taskIdProp?: string;
    taskDefaultProps?: ITaskData;
    lightMode?: boolean;
    onClose?: () => void;
}
const Task = ({ user, task, taskIdProp, taskDefaultProps, lightMode, onClose }: TaskReduxProps) => {
    const classes = useTaskStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { taskId } = useParams();

    const isLoading = useRef(false);
    const [editMode, setEditMode] = useState(false);

    const [body, changeBody] = useState({ ...(task || taskDefaultProps || emptyTaskData) });
    const onFieldChange = (event: any) => {
        const { name, value } = event.target;
        const newBody = { ...body, [name]: value };
        if (body.Id && name !== 'Title') onTaskSave(name, value);
        if (value && name === 'CompanyId') {
            newBody.DepartmentId = null;
            dispatch(getDepartments({ CompanyId: value }));
            newBody.ProjectId = null;
            dispatch(getProjects({ CompanyId: value }));
            newBody.SprintId = null;
            newBody.ExecuterUserId = null;
            newBody.BoardStateId = null;
        }
        if (value && name === 'DepartmentId') {
            dispatch(getCompanyUsers({ dept_id: value, project_id: body.ProjectId }));
            newBody.ExecuterUserId = null;
        }
        if (value && name === 'ProjectId') {
            dispatch(getCompanyUsers({ dept_id: body.DepartmentId, project_id: value }));
            newBody.ExecuterUserId = null;
            dispatch(getBoardStates({ ProjectId: value }));
            newBody.BoardStateId = null;
            dispatch(getTaskSprints({ ProjectId: value }));
            newBody.SprintId = null;
        }
        changeBody(newBody);
    };
    const onDescriptionChange = (newValue: string) => {
        changeBody({ ...body, Description: newValue });
    };
    const onFieldDatesChange = (newDates: any) => {
        const newBodyDatesPlan = { StartDatePlan: newDates[0] || null, EndDatePlan: newDates[1] || null };
        if (body.Id) dispatch(editTask(body.Id, newBodyDatesPlan, user));
        changeBody({ ...body, ...newBodyDatesPlan });
    };

    const onTaskSave = <T extends keyof ITaskData>(fieldName?: T, fieldValue?: ITaskData[T]) => {
        if (fieldName) dispatch(editTask(body.Id, { [fieldName]: fieldValue }, user));
        else if (body.Id) dispatch(editTask(body.Id, { Title: body.Title, Description: body.Description }, user));
        else
            dispatch(
                editTask(null, prepareToSaveTask(body), user, {
                    onSuccess: () => {
                        if (lightMode && onClose) onClose();
                    },
                }),
            );
        if (!body.Id && !lightMode) navigate('/tasks/kanban', { replace: true });
        setEditMode(false);
    };

    useEffect(() => {
        changeBody({ ...(task || taskDefaultProps || emptyTaskData) });
        if (task?.DepartmentId && task?.ProjectId) dispatch(getCompanyUsers({ dept_id: task.DepartmentId, project_id: task.ProjectId }));
        if (task?.ProjectId) dispatch(getBoardStates({ ProjectId: task.ProjectId }));
    }, [task]);

    const onGetTask = useCallback(
        (currentId: string) => {
            isLoading.current = true;
            dispatch(
                getTask(currentId, lightMode, {
                    onSuccess: () => {
                        isLoading.current = false;
                    },
                    onError: () => {
                        isLoading.current = false;
                    },
                }),
            );
        },
        [taskId, taskIdProp],
    );

    useEffect(() => {
        if (!isLoading.current) {
            if (taskId || !!taskIdProp) {
                onGetTask(taskId || taskIdProp || '');
            } else {
                setEditMode(true);
                changeBody({ ...(taskDefaultProps || emptyTaskData) });
            }
        }
    }, [taskId, taskIdProp]);

    useEffectOnce(() => {
        if (taskDefaultProps) changeBody({ ...taskDefaultProps });

        return () => {
            if (task) dispatch(resetTask(user?.UserId));
        };
    });

    const saveButton = () => {
        const isDisabledButton =
            !body.Id &&
            (!body.Title ||
                !body.Description ||
                !body.CompanyId ||
                !body.DepartmentId ||
                !body.ExecuterUserId ||
                !body.TypeId ||
                !body.SprintId ||
                !body.Priority);
        const button = (
            <Button color="primary" variant="contained" onClick={() => onTaskSave()} disabled={isDisabledButton}>
                {body.Id ? 'Сохранить' : 'Добавить'} работу
            </Button>
        );
        return isDisabledButton ? (
            <Tooltip title="Заполните все поля" arrow>
                <span style={{ display: 'inline-block' }}>{button}</span>
            </Tooltip>
        ) : (
            button
        );
    };

    const taskTabList: IMuiTab[] = [
        { index: 0, label: 'Комментарии', children: <TaskComments /> },
        { index: 1, label: 'Списать часы', children: <TaskExecutionTimes /> },
    ];

    const main = () => {
        return body ? (
            <React.Fragment>
                {!lightMode ? (
                    <PageTitle
                        title={
                            <React.Fragment>
                                <Link to="/tasks/kanban">Работы</Link> &#8250; Карточка работы
                            </React.Fragment>
                        }
                    />
                ) : null}
                <Paper>
                    <Box className={classes.header}>
                        {body.Id ? (
                            <Box className={classes.tools}>
                                <Box className={classes.toolsBox}>
                                    <Box className={classes.info}>
                                        <Box className={classes.infoLabel}>Автор</Box>
                                        <Box className={classes.infoValue}>{body.CreateUserName}</Box>
                                        <Box className={classes.infoNote}>{getDateTimeStr(body.CreateDate)}</Box>
                                    </Box>
                                </Box>
                                <Box className={classes.toolsBox}>
                                    <Box className={classes.info}>
                                        <Box className={classes.infoLabel}>Изменено</Box>
                                        <Box className={classes.infoValue}>{body.ModifyUserName}</Box>
                                        <Box className={classes.infoNote}>{getDateTimeStr(body.ModifyDate)}</Box>
                                    </Box>
                                    {task && task.Id && body && body.Id ? <TaskParticipants bodyTask={body} /> : null}
                                </Box>
                            </Box>
                        ) : null}
                        {body.Id ? (
                            <Box className={classes.tools}>
                                {body.StartDateFact && body.EndDateFact ? (
                                    <Box className={classes.toolsBox}>
                                        <Box className={classes.info}>
                                            <Box className={classes.infoLabel}>Период работ</Box>
                                            <Box className={classes.infoValue}>
                                                {getDateStr(body.StartDateFact)} - {getDateStr(body.EndDateFact)}
                                            </Box>
                                        </Box>
                                    </Box>
                                ) : (
                                    <Box className={classes.toolsBox}>&nbsp;</Box>
                                )}
                                {body.ExecutedTime && body.ExecutedPercent ? (
                                    <Box className={classes.toolsBox}>
                                        <Box className={classes.info}>
                                            <Box className={classes.infoLabel}>Отработанное время</Box>
                                            <Box className={classes.infoValue}>{getTimeFromMinutes(body.ExecutedTime)}ч.</Box>
                                            <Box className={classes.infoNote}>({body.ExecutedPercent}%)</Box>
                                        </Box>
                                    </Box>
                                ) : null}
                            </Box>
                        ) : null}
                        {!editMode ? (
                            <Typography className={classes.title} component="h2" variant="h2">
                                <Box className={classes.titleText}>
                                    {body.Number ? `${body.Number}: ` : null}
                                    {body.Title}
                                </Box>
                                <Tooltip title="Редактировать работу" arrow disableInteractive>
                                    <EditIcon className={classes.titleEditIcon} fontSize="small" onClick={() => setEditMode(true)} />
                                </Tooltip>
                            </Typography>
                        ) : (
                            <Box className={classes.titleInput}>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    type="text"
                                    name="Title"
                                    placeholder="Введите название работы"
                                    value={body.Title}
                                    onChange={onFieldChange}
                                    // onBlur={() => onTaskSave()}
                                    InputProps={
                                        body.Id
                                            ? {
                                                  endAdornment: (
                                                      <InputAdornment position="end">
                                                          <IconButton disableFocusRipple onMouseDown={() => onTaskSave()}>
                                                              <SaveAsIcon />
                                                          </IconButton>
                                                      </InputAdornment>
                                                  ),
                                              }
                                            : undefined
                                    }
                                />
                            </Box>
                        )}
                    </Box>
                    {!editMode ? (
                        <Box
                            className={classes.content}
                            dangerouslySetInnerHTML={{ __html: sanitizeHtml(body.Description || '<p>описание работы</p>') }}
                        />
                    ) : (
                        <React.Fragment>
                            <Box className={classes.content}>
                                <Box className={classes.description}>
                                    <ReactQuill modules={quillConfig} theme="snow" value={body.Description || ''} onChange={onDescriptionChange} />
                                </Box>
                                {saveButton()}
                            </Box>
                        </React.Fragment>
                    )}
                </Paper>
                {task && task.Id ? <TaskFiles /> : null}
                {!lightMode && task && task.Id ? <MuiTabs list={taskTabList} /> : null}
            </React.Fragment>
        ) : null;
    };

    const sidebar = () => {
        return body ? (
            <>
                <Paper className={clsx(classes.asideBox, { [classes.asideBoxFixed]: !lightMode })}>
                    <Box className={classes.asideInfo}>
                        <Box className={classes.asideInfoLabel}>Компания</Box>
                        <Box className={classes.asideInfoValue}>
                            <AutocompleteInput
                                name="CompanyId"
                                placeholder="Выберите компанию"
                                dictionaryName="companies"
                                selectProps={{
                                    valueField: 'Id',
                                    textField: 'Name',
                                }}
                                value={body.CompanyId || ''}
                                text={body.CompanyName || ''}
                                onChange={onFieldChange}
                                disabled={!!taskDefaultProps?.CompanyId}
                                disableClearable
                                size="small"
                            />
                        </Box>
                    </Box>
                    {body.CompanyId ? (
                        <>
                            <Box className={classes.asideInfo}>
                                <Box className={classes.asideInfoLabel}>Подразделение</Box>
                                <Box className={classes.asideInfoValue}>
                                    <AutocompleteInput
                                        name="DepartmentId"
                                        placeholder="Выберите подразделение"
                                        dictionaryName="departments"
                                        selectProps={{
                                            valueField: 'Id',
                                            textField: 'Name',
                                        }}
                                        value={body.DepartmentId || ''}
                                        text={body.DepartmentName || ''}
                                        onChange={onFieldChange}
                                        filters={{ CompanyId: body.CompanyId }}
                                        disableClearable
                                        size="small"
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.asideInfo}>
                                <Box className={classes.asideInfoLabel}>План СДР</Box>
                                <Box className={classes.asideInfoValue}>
                                    <AutocompleteInput
                                        name="ProjectId"
                                        placeholder="Выберите план СДР"
                                        dictionaryName="projects"
                                        selectProps={{
                                            valueField: 'Id',
                                            textField: 'Name',
                                        }}
                                        value={body.ProjectId || ''}
                                        text={body.ProjectName || ''}
                                        onChange={onFieldChange}
                                        filters={{ CompanyId: body.CompanyId }}
                                        disabled={!body.CompanyId || !!taskDefaultProps?.CompanyId}
                                        disableClearable
                                        size="small"
                                    />
                                </Box>
                            </Box>
                            {body.ProjectId ? (
                                <>
                                    <Box className={classes.asideInfo}>
                                        <Box className={classes.asideInfoLabel}>Спринт</Box>
                                        <Box className={classes.asideInfoValue}>
                                            <AutocompleteInput
                                                name="SprintId"
                                                placeholder="Выберите спринт"
                                                dictionaryName="taskSprints"
                                                selectProps={{
                                                    valueField: 'Id',
                                                    textField: 'Name',
                                                }}
                                                value={body.SprintId || ''}
                                                text={body.SprintName || ''}
                                                onChange={onFieldChange}
                                                filters={{ ProjectId: body.ProjectId }}
                                                disabled={!body.ProjectId}
                                                disableClearable
                                                size="small"
                                            />
                                        </Box>
                                    </Box>
                                    {body && body.Id ? (
                                        <Box className={classes.asideInfo}>
                                            <Box className={classes.asideInfoLabel}>Состояние</Box>
                                            <Box className={classes.asideInfoValue}>
                                                <AutocompleteInput
                                                    name="BoardStateId"
                                                    placeholder="Выберите состояние"
                                                    dictionaryName="boardStates"
                                                    selectProps={{
                                                        valueField: 'Id',
                                                        textField: 'Name',
                                                    }}
                                                    value={body.BoardStateId || ''}
                                                    text={body.BoardStateName || ''}
                                                    onChange={onFieldChange}
                                                    filters={{ ProjectId: body.ProjectId }}
                                                    disabled={!body.ProjectId}
                                                    disableClearable
                                                    size="small"
                                                />
                                            </Box>
                                        </Box>
                                    ) : null}
                                </>
                            ) : null}

                            {body.ProjectId && body.DepartmentId ? (
                                <Box className={classes.asideInfo}>
                                    <Box className={classes.asideInfoLabel}>Исполнитель</Box>
                                    <Box className={classes.asideInfoValue}>
                                        <AutocompleteInput
                                            name="ExecuterUserId"
                                            placeholder="Выберите исполнителя"
                                            dictionaryName="companyUsers"
                                            selectProps={{
                                                valueField: 'id',
                                                textField: 'full_name',
                                            }}
                                            value={body.ExecuterUserId || ''}
                                            text={body.ExecuterUserName || ''}
                                            onChange={onFieldChange}
                                            filters={{ dept_id: body.DepartmentId, project_id: body.ProjectId }}
                                            disabled={!body.ProjectId}
                                            disableClearable
                                            size="small"
                                        />
                                    </Box>
                                </Box>
                            ) : null}
                        </>
                    ) : null}
                    <Box className={classes.asideInfo}>
                        <Box className={classes.asideInfoLabel}>Тип работы</Box>
                        <Box className={classes.asideInfoValue}>
                            <AutocompleteInput
                                name="TypeId"
                                placeholder="Выберите тип"
                                dictionaryName="taskTypes"
                                selectProps={{
                                    valueField: 'Id',
                                    textField: 'Name',
                                }}
                                value={body.TypeId || ''}
                                text={body.TypeName || ''}
                                onChange={onFieldChange}
                                disableClearable
                                size="small"
                            />
                        </Box>
                    </Box>
                    <Box className={classes.asideInfo}>
                        <Box className={classes.asideInfoLabel}>Приоритет</Box>
                        <Box className={classes.asideInfoValue}>
                            <SelectInput
                                name="Priority"
                                value={body.Priority || ''}
                                options={[
                                    ...taskPriorities.map((type) => ({
                                        id: type.Code,
                                        value: type.Code,
                                        text: type.Name,
                                    })),
                                ]}
                                onChange={onFieldChange}
                                size="small"
                            />
                        </Box>
                    </Box>
                    {body.ProjectId ? (
                        <Box className={classes.asideInfo}>
                            <Box className={classes.asideInfoLabel}>Родительская работа</Box>
                            <Box className={classes.asideInfoValue}>
                                <AutocompleteInput
                                    name="ParentId"
                                    placeholder="Выберите работу"
                                    dictionaryName="projectTasks"
                                    selectProps={{
                                        valueField: 'Id',
                                        textField: 'Title',
                                    }}
                                    value={body.ParentId || ''}
                                    text={body.ParentTitle || ''}
                                    onChange={onFieldChange}
                                    filters={{ ProjectId: body.ProjectId }}
                                    disabled={!body.ProjectId}
                                    size="small"
                                />
                            </Box>
                        </Box>
                    ) : null}
                    <Box className={classes.asideInfo}>
                        <Box className={classes.asideInfoLabel}>Планируемые даты начала/окончания</Box>
                        <Box className={classes.asideInfoValue}>
                            <DateRangePicker
                                name={'Dates'}
                                values={[body?.StartDatePlan || '', body?.EndDatePlan || '']}
                                onChange={onFieldDatesChange}
                                keyboard={false}
                            />
                        </Box>
                    </Box>
                    <Box className={classes.asideInfo}>
                        <Box className={classes.asideInfoLabel}>Планируемое время, ч.</Box>
                        <Box className={classes.asideInfoValue} style={{ width: '49%' }}>
                            <UniversalInput
                                type="hours"
                                name="PlannedTime"
                                value={task?.PlannedTime || body.PlannedTime}
                                onChange={onFieldChange}
                                onBlur={onFieldChange}
                            />
                        </Box>
                    </Box>
                </Paper>
            </>
        ) : null;
    };

    return isLoading.current ? (
        <Loader />
    ) : (
        <Box className={classes.task}>
            <Columns content={main()} aside={sidebar()} reverse={true} />
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { task } = taskSelector(state);
    return { user, task };
};

const connector = connect(mapStateToProps);
type TaskReduxProps = ConnectedProps<typeof connector> & ITask;

export default compose(connector)(Task);
