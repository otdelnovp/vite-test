import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';

import UniversalForm from '@core/UniversalForm/UniversalForm';
import { IFormField } from '@core/UniversalForm/models';

import { IUserData } from '@helpers/authHelper';
import { getCompanies } from '@services/dictionaryService';
import { useEffectOnce } from '@hooks/useEffectOnce';

import { useListStyles } from '@pages/Dictionary/Universal/styles';
import { IUserListFilter } from './model';

interface IUserListFilterProps {
    user: IUserData | null;
    filter: IUserListFilter;
    filterModel: IFormField[];
    onSetFilter: (newFilter: IUserListFilter) => void;
}

const WeeklyReportListFilter = React.memo(({ user, filter, filterModel, onSetFilter }: IUserListFilterProps) => {
    const classes = useListStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onFilterChange = (name: string, value: any, params?: any) => {
        let titleName = '';
        let titleValue = '';
        switch (name) {
            case 'CompanyId':
                titleName = 'CompanyName';
                titleValue = params ? params.Name : '';
                break;
        }
        const newFilter = { ...filter, [name]: value, [titleName]: titleValue };
        onSetFilter(newFilter);
        localStorage.setItem('user-list-filter', JSON.stringify(newFilter));
    };

    useEffectOnce(() => {
        const storagedFilter = localStorage.getItem('user-list-filter');
        if (storagedFilter) {
            const newFilter = JSON.parse(storagedFilter);
            onSetFilter(newFilter);
        }
        dispatch(getCompanies(user));
    });

    return (
        <Box component="div" className={classes.filter}>
            <UniversalForm data={filter} onFieldChange={onFilterChange} model={filterModel} onSubmit={() => {}} />
        </Box>
    );
});

export default WeeklyReportListFilter;
