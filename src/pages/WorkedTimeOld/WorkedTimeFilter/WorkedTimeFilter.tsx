import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';
import { SelectInput } from '@core/UniversalInput/SelectInput';

import { IUserData } from '@helpers/authHelper';
import { monthList, yearList } from '@helpers/dateHelper';
import { getDepartments } from '@services/dictionaryService';

import { useStyles } from './styles';

interface IWorkedTimeFilter {
    user: IUserData | null;
    filter: IFilter;
    setFilter: (newFilter: IFilter) => void;
}

export interface IFilter {
    year: number;
    month: number;
    companyId: string | null;
    departmentId: string | null;
}

const WorkedTimeFilter = ({ user, filter, setFilter }: IWorkedTimeFilter) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onFilterChange = (event: any) => {
        const { name, value } = event.target;
        const newFilter = { ...filter, [name]: value };
        if (name === 'companyId') {
            newFilter.departmentId = null;
            if (value) dispatch(getDepartments({ CompanyId: value }));
        }
        setFilter(newFilter);
        //onSetFilter(newFilter);
    };

    return (
        <Box className={classes.filter}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <SelectInput
                        name="year"
                        label="Год"
                        placeholder="none"
                        value={filter.year}
                        options={yearList.map((year) => ({
                            id: year.toString(),
                            value: year.toString(),
                            text: year.toString(),
                        }))}
                        onChange={onFilterChange}
                    />
                </Grid>
                <Grid item xs={2}>
                    <SelectInput
                        name="month"
                        label="Месяц"
                        placeholder="none"
                        value={filter.month}
                        options={monthList.map((month, index) => ({
                            id: (index + 1).toString(),
                            value: (index + 1).toString(),
                            text: month.toString(),
                        }))}
                        onChange={onFilterChange}
                    />
                </Grid>
                <Grid item xs={4}>
                    <AutocompleteInput
                        name="companyId"
                        label="Компания"
                        placeholder="Выберите компанию"
                        dictionaryName="companies"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={filter.companyId || ''}
                        text={''}
                        onChange={onFilterChange}
                    />
                </Grid>
                {filter.companyId ? (
                    <Grid item xs={5}>
                        <AutocompleteInput
                            name="departmentId"
                            label="Подразделение"
                            placeholder="Выберите подразделение"
                            dictionaryName="departments"
                            selectProps={{
                                valueField: 'Id',
                                textField: 'Name',
                            }}
                            value={filter.departmentId || ''}
                            text={''}
                            onChange={onFilterChange}
                            filters={{ CompanyId: filter.companyId }}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
};

export default WorkedTimeFilter;

