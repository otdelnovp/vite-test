import React, { useCallback, useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from '../../../index';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import { Loader } from '@core/Loader/Loader';
// import { SelectInput } from '@core/UniversalInput/SelectInput';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { userSelector } from '@services/userService';
import { getTaskFinderList, taskSelector } from '@services/taskService';
import { getDepartments, getProjects, getTaskSprints } from '@services/dictionaryService';
import { RootState } from '@services/index';

import { IUserData } from '@helpers/authHelper';
import { ITaskFinderFilters, taskFinderFiltersInit } from './methods';
import { useTaskFinderStyles } from '../styles';
import { ITaskListData } from '../methods';
import { getDateStr } from '@helpers/methods';

interface ITaskFinderFiltersComponent {
    user: IUserData | null;
    initFilters: ITaskFinderFilters;
    onSetFilter: (newFilter: ITaskFinderFilters) => void;
    onSearch: () => void;
}
const TaskFinderFilter = React.memo(({ user, onSetFilter, onSearch, initFilters }: ITaskFinderFiltersComponent) => {
    const classes = useTaskFinderStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, changeFilter] = useState<ITaskFinderFilters>({ ...taskFinderFiltersInit, ...initFilters });

    const onFilterChange = (event: any) => {
        const { name, value } = event.target;
        const newFilter = { ...filter, [name]: value };
        if (name === 'CompanyId') {
            dispatch(getDepartments({ CompanyId: value }));
            newFilter.DepartmentId = null;
            dispatch(getProjects({ CompanyId: value }));
            newFilter.ProjectId = null;
            dispatch(getTaskSprints({ CompanyId: value }));
            newFilter.SprintId = null;
        }
        if (name === 'ProjectId') {
            newFilter.SprintId = null;
        }
        changeFilter(newFilter);
        onSetFilter(newFilter);
    };

    return (
        <Box component="div" className={classes.filter}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <AutocompleteInput
                        name="CompanyId"
                        label="Компания"
                        placeholder="Выберите компанию"
                        dictionaryName="companies"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={filter.CompanyId || ''}
                        text={filter.CompanyName || ''}
                        onChange={onFilterChange}
                        disabled={!!initFilters.CompanyId}
                    />
                </Grid>
                {filter.CompanyId ? (
                    <>
                        <Grid item xs={12}>
                            <AutocompleteInput
                                name="DepartmentId"
                                label="Подразделение"
                                placeholder="Выберите подразделение"
                                dictionaryName="departments"
                                selectProps={{
                                    valueField: 'Id',
                                    textField: 'Name',
                                }}
                                value={filter.DepartmentId || ''}
                                text={filter.DepartmentName || ''}
                                onChange={onFilterChange}
                                filters={{ CompanyId: filter.CompanyId }}
                                disabled={!filter.CompanyId || !!initFilters.DepartmentId}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <AutocompleteInput
                                name="ProjectId"
                                label="План СДР"
                                placeholder="Выберите план СДР"
                                dictionaryName="projects"
                                selectProps={{
                                    valueField: 'Id',
                                    textField: 'Name',
                                }}
                                value={filter.ProjectId || ''}
                                text={filter.ProjectName || ''}
                                onChange={onFilterChange}
                                filters={{ CompanyId: filter.CompanyId }}
                                disabled={!filter.CompanyId || !!initFilters.ProjectId}
                                size="small"
                            />
                        </Grid>
                        {filter.ProjectId ? (
                            <Grid item xs={12}>
                                <AutocompleteInput
                                    name="SprintId"
                                    label="Спринт"
                                    placeholder="Выберите спринт"
                                    dictionaryName="taskSprints"
                                    selectProps={{
                                        valueField: 'Id',
                                        textField: 'Name',
                                    }}
                                    value={filter.SprintId || ''}
                                    text={filter.SprintName || ''}
                                    onChange={onFilterChange}
                                    filters={{ ProjectId: filter.ProjectId }}
                                    disabled={!filter.ProjectId || !!initFilters.SprintId}
                                    size="small"
                                />
                            </Grid>
                        ) : null}
                    </>
                ) : null}
                <Grid item xs={12}>
                    <Button variant={'contained'} onClick={() => onSearch()} fullWidth disabled={!filter.ProjectId} sx={{ marginTop: 2 }}>
                        Искать
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
});

interface ITaskFinder {
    initFilters?: ITaskFinderFilters;
    onSelect: (selectedTask: ITaskListData) => void;
    onClose: () => void;
}
const TaskFinder = ({ user, onClose, onSelect, initFilters = { ...taskFinderFiltersInit } }: TaskFinderReduxProps) => {
    const classes = useTaskFinderStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setLoader] = useState(false);
    const [filter, setFilter] = useState<ITaskFinderFilters>({ ...taskFinderFiltersInit });
    const [taskList, setTaskList] = useState<ITaskListData[]>([]);

    const loadTaskFinderList = useCallback(() => {
        setLoader(true);
        dispatch(
            getTaskFinderList(filter, {
                onSuccess: (response) => {
                    setTaskList(response?.rows?.length ? response.rows : []);
                    setLoader(false);
                },
            }),
        );
    }, [filter]);

    // useEffect(() => {
    //     loadTaskFinderList();
    // }, []);

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="lg" scroll="body">
            <DialogTitle>Выбор работы</DialogTitle>
            <DialogContent>
                <Grid container spacing={4}>
                    <Grid item xs={4}>
                        <TaskFinderFilter user={user} onSetFilter={setFilter} onSearch={loadTaskFinderList} initFilters={initFilters} />
                    </Grid>
                    <Grid item xs={8}>
                        {isLoading ? (
                            <Loader />
                        ) : taskList?.length ? (
                            <TableContainer sx={{ width: 'unset' }}>
                                <Table aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Работа</TableCell>
                                            <TableCell>Дата начала</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {taskList.map((task) => (
                                            <TableRow key={task.Id}>
                                                <TableCell>
                                                    {task.Number}. {task.Title}
                                                </TableCell>
                                                <TableCell>
                                                    {task.StartDateFact || task.StartDatePlan
                                                        ? getDateStr(task.StartDateFact || task.StartDatePlan)
                                                        : null}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip arrow title="Выбрать работу">
                                                        <IconButton
                                                            onClick={() => {
                                                                onSelect(task);
                                                                onClose();
                                                            }}
                                                            aria-label="select task"
                                                        >
                                                            <CheckBoxIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box className={classes.helper}>
                                <Box className={classes.helperArrow}>&larr;</Box>
                                Укажите интересующий проект
                                <br /> и выполните поиск
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};
const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const {} = taskSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type TaskFinderReduxProps = ConnectedProps<typeof connector> & ITaskFinder;

export default compose(connector)(TaskFinder);

