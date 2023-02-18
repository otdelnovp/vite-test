import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

import UniversalInput from '@core/UniversalInput/UniversalInput';
import { DateRangePicker } from '@core/DatePicker/DateRangePicker';
import { SelectInput } from '@core/UniversalInput/SelectInput';

import { IUserData } from '@helpers/authHelper';
import { taskPriorities } from '@helpers/dictionariesHelper';

import { ITaskFilters } from './methods';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';

export interface ITaskFilter {
    user: IUserData | null;
    filters: ITaskFilters;
    setFilters: (newFilters: ITaskFilters) => void;
}
export const TaskFilters = ({ filters, setFilters }: ITaskFilter) => {
    const [bodyFilters, changeFilters] = useState(filters);

    const onDateChange = (newDates: any) => {
        changeFilters({ ...filters, DateFrom: newDates[0], DateTo: newDates[1] });
    };

    const onFieldChange = (event: any) => {
        const { name, value } = event.target;
        const newBodyFilters = { ...bodyFilters };
        // @ts-ignore
        newBodyFilters[name] = value;
        changeFilters(newBodyFilters);
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        setFilters(bodyFilters);
    };

    return (
        <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <DateRangePicker
                        name={'Dates'}
                        values={[bodyFilters.DateFrom || '', bodyFilters.DateTo || '']}
                        onChange={onDateChange}
                        label="Дата создания"
                    />
                </Grid>
                <Grid item xs={12}>
                    <AutocompleteInput
                        name="TypeId"
                        label="Тип работы"
                        placeholder="Выберите тип работы"
                        dictionaryName="taskTypes"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={bodyFilters.TypeId || ''}
                        text={''}
                        onChange={onFieldChange}
                    />
                </Grid>
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
                        value={bodyFilters.SprintId || ''}
                        text={''}
                        onChange={onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <AutocompleteInput
                        name="StateId"
                        label="Статус работы"
                        placeholder="Выберите статус"
                        dictionaryName="taskStates"
                        selectProps={{
                            valueField: 'Id',
                            textField: 'Name',
                        }}
                        value={bodyFilters.StateId || ''}
                        text={''}
                        onChange={onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <SelectInput
                        name="Priority"
                        label="Приоритет работы"
                        placeholder="Выберите приоритет"
                        value={bodyFilters.Priority || ''}
                        options={[
                            ...taskPriorities.map((type) => ({
                                id: type.Code,
                                value: type.Code,
                                text: type.Name,
                            })),
                        ]}
                        onChange={onFieldChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <UniversalInput name="TaskName" label="Название работы" value={bodyFilters.TaskName || ''} onChange={onFieldChange} />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" startIcon={<SearchIcon />} onClick={onSubmit} fullWidth>
                        Искать
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};
