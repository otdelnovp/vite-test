import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { getCompanyUsers, getDepartments, getProjects } from '@services/dictionaryService';
import { IUserData } from '@helpers/authHelper';
import { getTaskSprints } from '@services/dictionaryService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useTaskKanbanStyles } from './style';

export interface ITaskKanbanFilter {
    CompanyId: string | null;
    CompanyName: string;
    DepartmentId: string | null;
    DepartmentName: string;
    ExecuterUserId: string | null;
    ExecuterUserName: string;
    ProjectId: string | null;
    ProjectName: string;
    SprintId: string | null;
    SprintName: string;
}

export const taskKanbanFilterDefault: ITaskKanbanFilter = {
    CompanyId: null,
    CompanyName: '',
    DepartmentId: null,
    DepartmentName: '',
    ExecuterUserId: null,
    ExecuterUserName: '',
    ProjectId: null,
    ProjectName: '',
    SprintId: null,
    SprintName: '',
};

interface ITaskKanbanFiltersProps {
    user: IUserData | null;
    filter: ITaskKanbanFilter;
    setFilter: (newFilter: ITaskKanbanFilter) => void;
}

export const TaskKanbanFilters = ({ user, filter, setFilter }: ITaskKanbanFiltersProps) => {
    const classes = useTaskKanbanStyles();
    const dispatch = useDispatch<AppDispatch>();

    const setCompanyId = (companyId: string, name: string) => {
        setFilter({
            ...taskKanbanFilterDefault,
            CompanyId: companyId,
            CompanyName: name,
            DepartmentId: '',
            DepartmentName: '',
            ExecuterUserId: '',
            ExecuterUserName: '',
            ProjectId: '',
            ProjectName: '',
            SprintId: '',
            SprintName: '',
        });
    };
    const setDepartmentId = (departmentId: string, name: string) => {
        setFilter({
            ...filter,
            DepartmentId: departmentId,
            DepartmentName: name,
            ExecuterUserId: '',
            ExecuterUserName: '',
        });
    };
    const setExecuterUserId = (executerUserId: string, name: string) => {
        console.log("name", name)
        setFilter({
            ...filter,
            ExecuterUserId: executerUserId,
            ExecuterUserName: name,
        });
    };
    const setProjectId = (projectId: string, name: string) => {
        setFilter({
            ...filter,
            ProjectId: projectId,
            ProjectName: name,
            SprintId: '',
            SprintName: '',
            ExecuterUserId: '',
            ExecuterUserName: '',
        });
    };
    const setSprintId = (sprintId: string, name: string) => {
        setFilter({ ...filter, SprintId: sprintId, SprintName: name });
    };

    useEffect(() => {
        if (filter.CompanyId) {
            dispatch(getProjects({ CompanyId: filter.CompanyId }));
            dispatch(getDepartments({ CompanyId: filter.CompanyId }));
            dispatch(getCompanyUsers({ CompanyId: filter.CompanyId }));
        }
        if (filter.ProjectId) {
            dispatch(getTaskSprints({ ProjectId: filter.ProjectId }));
            dispatch(
                getCompanyUsers({ org_id: filter.CompanyId || null, dept_id: filter.DepartmentId || null, project_id: filter.ProjectId || null }),
            );
        }
        if (filter.CompanyId) localStorage.setItem('kanban-filter', JSON.stringify(filter));
    }, [filter]);

    useEffectOnce(() => {
        if (filter.CompanyId) {
            dispatch(getProjects({ CompanyId: filter.CompanyId }));
            dispatch(getDepartments({ CompanyId: filter.CompanyId }));
            dispatch(getCompanyUsers({ CompanyId: filter.CompanyId }));
        }
        if (filter.ProjectId) {
            dispatch(getTaskSprints({ ProjectId: filter.ProjectId }));
            dispatch(
                getCompanyUsers({ org_id: filter.CompanyId || null, dept_id: filter.DepartmentId || null, project_id: filter.ProjectId || null }),
            );
        }
        const storagedFilter = localStorage.getItem('kanban-filter');
        if (storagedFilter) {
            const newFilter = JSON.parse(storagedFilter);
            setFilter(newFilter);
        }
    });

    return (
        <>
            <Box className={classes.filter}>
                <Grid container spacing={2}>
                    <Grid item xs>
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
                            onChange={(e, params) => setCompanyId(e.target.value, params && params.Name)}
                        />
                    </Grid>
                    <Grid item xs>
                        <AutocompleteInput
                            name="ProjectId"
                            label="Проект"
                            placeholder="Выберите проект"
                            dictionaryName="projects"
                            selectProps={{
                                valueField: 'Id',
                                textField: 'Name',
                            }}
                            value={filter.ProjectId || ''}
                            text={filter.ProjectName || ''}
                            onChange={(e, params) => setProjectId(e.target.value, params && params.Name)}
                            filters={{ CompanyId: filter.CompanyId }}
                            disabled={!filter.CompanyId}
                        />
                    </Grid>
                    <Grid item xs>
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
                            onChange={(e, params) => setSprintId(e.target.value, params && params.Name)}
                            filters={{ ProjectId: filter.ProjectId }}
                            disabled={!filter.ProjectId}
                        />
                    </Grid>
                    <Grid item xs>
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
                            onChange={(e, params) => setDepartmentId(e.target.value, params && params.Name)}
                            filters={{ CompanyId: filter.CompanyId }}
                        />
                    </Grid>
                    <Grid item xs>
                        <AutocompleteInput
                            name="ExecuterUserId"
                            label="Исполнитель"
                            placeholder="Выберите исполнителя"
                            dictionaryName="companyUsers"
                            selectProps={{
                                valueField: 'id',
                                textField: 'full_name',
                            }}
                            value={filter.ExecuterUserId || ''}
                            text={filter.ExecuterUserName || ''}
                            onChange={(e, params) => setExecuterUserId(e.target.value, params && params.full_name)}
                            filters={{ org_id: filter.CompanyId || null, dept_id: filter.DepartmentId || null, project_id: filter.ProjectId || null }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default TaskKanbanFilters;
