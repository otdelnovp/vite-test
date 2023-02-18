import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { getTasks, taskSelector } from '@services/taskService';
import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import TaskFinder from '@pages/Tasks/TaskFinder/TaskFinder';
import { ITaskFinderFilters } from '@pages/Tasks/TaskFinder/methods';

import { useStyles } from './styles';
import { useEffectOnce } from '@hooks/useEffectOnce';

export interface ITaskInput {
    name: string;
    label?: string;
    placeholder?: string;
    value: string | null;
    text?: string;
    required?: boolean;
    gridSize?: number;
    companyId?: string;
    companyName?: string;
    taskFinderFilters?: ITaskFinderFilters;
    sx?: any;
    excludeOptions?: string[];
    onChange: (value: string | null, name?: string) => void;
}

const TaskInput: React.FC<ITaskInputReduxProps> = ({
    name,
    label,
    placeholder = 'Выберите работу...',
    value,
    text,
    required,
    gridSize,
    taskFinderFilters,
    sx,
    excludeOptions,
    tasks,
    user,
    onChange,
}) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [taskFinderVisible, setTaskFinderVisible] = useState(false);
    const [localValue, setLocalValue] = useState(null as { Id: string; Name: string } | null);
    const [preparedOptions, setPreparedOptions] = useState([] as any[]);

    const onChangeValue = (event: any, selected: any) => {
        if (selected) {
            onChange(selected.Id, selected.Name);
            setLocalValue({ Id: selected.Id, Name: selected.Name });
        } else {
            onChange(null);
            setLocalValue(null);
        }
    };

    const onSelectTaskFinder = (selectedTask: any) => {
        if (selectedTask && selectedTask.Id && selectedTask.Title) {
            setLocalValue({ Id: selectedTask.Id, Name: `${selectedTask.Number}. ${selectedTask.Title}` });
            onChange(selectedTask.Id, `${selectedTask.Number}. ${selectedTask.Title}`);
        }
    };

    useEffect(() => {
        let preparedTasks: any[] = [];
        if (tasks && tasks.length) {
            preparedTasks = tasks.map((task) => {
                return { Id: task.Id || '', Name: `${task.Number}. ${task.Title}` || '' };
            });
            preparedTasks.sort((a, b) => (a.Number > b.Number ? -1 : 1));
        } else if (!!value && !!text) {
            preparedTasks = [
                {
                    Id: value,
                    Name: text,
                },
            ];
        }
        if (excludeOptions) {
            preparedTasks = preparedTasks.filter((item: any) => excludeOptions.findIndex((exOpt) => exOpt === item.Id) < 0);
        }
        setPreparedOptions(preparedTasks);

        if (tasks && tasks.length) {
            const currentTask = tasks.find((item) => item.Id === value);
            if (currentTask) {
                setLocalValue({ Id: currentTask.Id || '', Name: `${currentTask.Number}. ${currentTask.Title}` });
                return;
            }
        }
    }, [tasks, excludeOptions]);

    useEffect(() => {
        if (!value) {
            setLocalValue(null);
        }
    }, [value]);

    useEffect(() => {
        const taskFilters = {
            CompanyId: taskFinderFilters?.CompanyId ? taskFinderFilters?.CompanyId : null,
        };
        if (taskFilters.CompanyId) {
            console.log('Task.List getTasks CompanyId', taskFilters.CompanyId);
            dispatch(getTasks(user, taskFilters, { page_size: 1000, page_number: 1 }));
        }
    }, [taskFinderFilters]);

    return (
        <Grid item xs={gridSize || 6} key={`${name}Key`}>
            <Autocomplete
                id={`${name}Id`}
                key={`${name}AutocompleteKey`}
                value={localValue || null}
                options={preparedOptions}
                noOptionsText={'Значения не найдены.'}
                sx={sx}
                getOptionLabel={(option: any) => option.Name}
                disablePortal={true}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        classes={{ root: classes.textFieldRoot }}
                        label={label}
                        placeholder={placeholder}
                        variant="filled"
                        required={required}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <React.Fragment>
                                    {params.InputProps.endAdornment}
                                    <IconButton onClick={() => setTaskFinderVisible(true)} size="small" className="taskFinderBtn">
                                        <MoreHorizIcon />
                                    </IconButton>
                                </React.Fragment>
                            ),
                        }}
                    />
                )}
                onChange={onChangeValue}
                isOptionEqualToValue={(option: any, value: any) => option.Id === value.Id}
            />
            {taskFinderVisible ? (
                <TaskFinder onSelect={onSelectTaskFinder} onClose={() => setTaskFinderVisible(false)} initFilters={taskFinderFilters} />
            ) : null}
        </Grid>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { tasks } = taskSelector(state);
    return { user, tasks };
};

const connector = connect(mapStateToProps);
type ITaskInputReduxProps = ConnectedProps<typeof connector> & ITaskInput;

export default compose(connector)(TaskInput);

