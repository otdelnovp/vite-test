import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { SelectInput } from '@core/UniversalInput/SelectInput';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

import { IUserData } from '@helpers/authHelper';
import { monthList, yearList } from '@helpers/dateHelper';
import { getDepartments } from '@services/dictionaryService';

import { IWorkedTimeFilter, workedTimeFilterInit } from './methods';
import { useStyles } from './styles';

interface IWorkedTimeFilterProps {
    user: IUserData | null;
    onSetFilter: (newFilter: IWorkedTimeFilter) => void;
}

const WorkedTimeFilter = React.memo(({ user, onSetFilter }: IWorkedTimeFilterProps) => {
    const classes = useStyles();
    const dispatch = useDispatch<AppDispatch>();

    const [filter, changeFilter] = useState<IWorkedTimeFilter>({ ...workedTimeFilterInit });

    const onFilterChange = (event: any, options: any) => {
        const { name, value } = event.target;
        let newFilter = { ...filter, [name]: value };
        switch (name) {
            case 'CompanyId':
                newFilter.CompanyName = options.Name;
                newFilter.DepartmentId = null;
                if (value) dispatch(getDepartments({ CompanyId: value }));
                break;
            case 'DepartmentId':
                newFilter.DepartmentName = options.Name;
                break;
            default:
                break;
        }
        changeFilter(newFilter);
        onSetFilter(newFilter);
    };

    return (
        <Box component="div" className={classes.filter}>
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <SelectInput
                        name="Year"
                        label="Год"
                        placeholder="none"
                        value={filter.Year}
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
                        name="Month"
                        label="Месяц"
                        placeholder="none"
                        value={filter.Month}
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
                        name="CompanyId"
                        label="Компания"
                        placeholder="Выберите компанию"
                        dictionaryName="companies"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={filter.CompanyId || ''}
                        onChange={onFilterChange}
                    />
                </Grid>
                {filter.CompanyId ? (
                    <Grid item xs={5}>
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
                            onChange={onFilterChange}
                            filters={{ CompanyId: filter.CompanyId }}
                        />
                    </Grid>
                ) : null}
            </Grid>
        </Box>
    );
});

export default WorkedTimeFilter;

