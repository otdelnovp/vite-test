import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';

import UniversalForm from '@core/UniversalForm/UniversalForm';
import { IFormField } from '@core/UniversalForm/models';

import { IUserData } from '@helpers/authHelper';
import { getCompanies, getCompanyUsers, getDepartments } from '@services/dictionaryService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useListStyles } from '../../Dictionary/Universal/styles';
import { IWeeklyReportListFilter } from './model';

interface IWeeklyReportListFilterProps {
    user: IUserData | null;
    filter: IWeeklyReportListFilter;
    filterModel: IFormField[];
    onSetFilter: (newFilter: IWeeklyReportListFilter) => void;
}

const WeeklyReportListFilter = React.memo(({ user, filter, filterModel, onSetFilter }: IWeeklyReportListFilterProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onFilterChange = (name: string, value: any, params?: any) => {
        let titleName = '';
        let titleValue = '';
        switch (name) {
            case 'CompanyId':
                titleName = 'CompanyName';
                titleValue = params ? params.Name : '';
                dispatch(getDepartments({ CompanyId: value }));
                dispatch(getCompanyUsers({ org_id: value }));
                break;
            case 'DepartmentId':
                titleName = 'DepartmentName';
                titleValue = params ? params.Name : '';
                dispatch(getCompanyUsers({ org_id: filter.CompanyId, dept_id: value }));
                break;
            case 'WorkerId':
                titleName = 'WorkerName';
                titleValue = params ? params.FullName : '';
                break;
        }
        const newFilter = { ...filter, [name]: value, [titleName]: titleValue };

        if (name === 'CompanyId') {
            newFilter.DepartmentId = null;
            newFilter.DepartmentName = '';
            newFilter.WorkerId = null;
            newFilter.WorkerName = '';
        }
        if (name === 'DepartmentId') {
            newFilter.WorkerId = null;
            newFilter.WorkerName = '';
        }
        onSetFilter(newFilter);
        localStorage.setItem('weekly-report-list-filter', JSON.stringify(newFilter));
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
        localStorage.setItem('weekly-report-list-filter', JSON.stringify(newFilter));
    };

    useEffectOnce(() => {
        const storagedFilter = localStorage.getItem('weekly-report-list-filter');
        if (storagedFilter) {
            const newFilter = JSON.parse(storagedFilter);
            onSetFilter(newFilter);
            if (newFilter.CompanyId) {
                dispatch(getCompanies(user));
                dispatch(getCompanyUsers({ org_id: newFilter.CompanyId, dept_id: newFilter.DepartmentId }));
                dispatch(getDepartments({ CompanyId: newFilter.CompanyId }));
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

export default WeeklyReportListFilter;
