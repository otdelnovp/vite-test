import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';

import UniversalForm from '@core/UniversalForm/UniversalForm';
import { IFormField } from '@core/UniversalForm/models';

import { IUserData } from '@helpers/authHelper';
import { getCompanies, getCompanyUsers } from '@services/dictionaryService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { IProjectListFilter } from './model';
import { useListStyles } from '../../Universal/styles';

interface IProjectListFilterProps {
    user: IUserData | null;
    filter: IProjectListFilter;
    filterModel: IFormField[];
    onSetFilter: (newFilter: IProjectListFilter) => void;
}

const ProjectListFilter = React.memo(({ user, filter, filterModel, onSetFilter }: IProjectListFilterProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onFilterChange = (name: string, value: any, params?: any) => {
        let titleName = '';
        let titleValue = '';
        switch (name) {
            case 'CompanyId':
                titleName = 'CompanyName';
                titleValue = params ? params.Name : '';
                dispatch(getCompanyUsers({ org_id: value }));
                break;
            case 'CreateUserId':
                titleName = 'CreateUserName';
                titleValue = params ? params.FullName : '';
                break;
            case 'ObserverUserId':
                titleName = 'ObserverUserName';
                titleValue = params ? params.FullName : '';
                break;
        }
        const newFilter = { ...filter, [name]: value, [titleName]: titleValue };
        if (name === 'State' && !value) {
            newFilter.State = null;
        }
        if (name === 'CompanyId') {
            newFilter.CreateUserId = null;
            newFilter.CreateUserName = '';
            newFilter.ObserverUserId = null;
            newFilter.ObserverUserName = '';
        }
        onSetFilter(newFilter);
        localStorage.setItem('project-list-filter', JSON.stringify(newFilter));
    };

    const onDateRangeChange = (newDates: string[]) => {
        const newFilterDates = [
            newDates[0] === 'Invalid date' || !newDates[0] ? null : newDates[0],
            newDates[1] === 'Invalid date' || !newDates[1] ? null : newDates[1],
        ];
        if (newFilterDates[0] === filter.DateFrom && newFilterDates[1] === filter.DateTo) return;
        const newFilter = {
            ...filter,
            DateFrom: newFilterDates[0],
            DateTo: newFilterDates[1],
        };
        onSetFilter(newFilter);
        localStorage.setItem('project-list-filter', JSON.stringify(newFilter));
    };

    useEffectOnce(() => {
        const storagedFilter = localStorage.getItem('project-list-filter');
        if (storagedFilter) {
            const newFilter = JSON.parse(storagedFilter);
            onSetFilter(newFilter);
            if (newFilter.CompanyId) {
                dispatch(getCompanies(user));
                dispatch(getCompanyUsers({ org_id: newFilter.CompanyId }));
            }
        }
    });

    return (
        <Box component="div" className={classes.filter}>
            <UniversalForm
                data={filter}
                onFieldChange={onFilterChange}
                onDateRangeChange={onDateRangeChange}
                model={filterModel}
                onSubmit={() => {}}
            />
        </Box>
    );
});

export default ProjectListFilter;
