import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import { RootState } from '@services/index';
import { ISelectProps } from '@core/UniversalInput/methods';
import { IAsyncDictionaries } from '@helpers/dictionariesHelper';
import { userSelector } from '@services/userService';
import {
    getCompanies,
    getDepartments,
    getCompanyUsers,
    getCompanyOwnershipTypes,
    getWorkExceptionTypes,
    getTaskTypes,
    getTaskStates,
    dictSelectors,
    getTaskSprints,
    getBoardStates,
    getProjects,
    getProjectTasks,
    getRoles,
    getUserGroups,
} from '@services/dictionaryService';

import { useAutocompleteStyles } from './styles';
import { getTasks, taskSelector } from '@services/taskService';

export interface IAutocompleteInput {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    value?: any;
    text?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    multiple?: boolean;
    required?: boolean;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onOpen?: (event: any) => void;
    onChange?: (event: any, params?: any, fieldName?: string) => void;
    selectProps?: ISelectProps;
    noOptionsText?: string;
    isAddable?: boolean;
    helperText?: string;
    error?: boolean;
    dictionaryName:
        | 'companies'
        | 'departments'
        | 'companyUsers'
        | 'companyOwnershipTypes'
        | 'workExceptionTypes'
        | 'taskTypes'
        | 'taskStates'
        | 'taskSprints'
        | 'boardStates'
        | 'projects'
        | 'projectTasks'
        | 'tasks'
        | 'roles'
        | 'userGroups';
    excludeOptions?: string[];
    filters?: Object;
    skipId?: string;
    disabled?: boolean;
    disablePortal?: boolean;
    disableClearable?: boolean;
}

const AutocompleteInput = ({
    id,
    name,
    variant = 'filled',
    size = 'small',
    label,
    placeholder,
    multiple,
    required,
    value,
    text,
    selectProps = {
        valueField: 'Id',
        textField: 'Name',
    },
    onFocus,
    onBlur,
    onOpen,
    onChange,
    noOptionsText = 'Значения не найдены',
    isAddable,
    helperText,
    error,
    dynamicOptions,
    dictionaryName,
    excludeOptions,
    filters,
    skipId,
    disabled,
    disablePortal,
    disableClearable,
    user,
}: AutocompleteInputReduxProps) => {
    const classes = useAutocompleteStyles();
    const dispatch = useDispatch<AppDispatch>();

    const onLoadingMethod = {
        companies: () => dispatch(getCompanies(user)),
        departments: () => dispatch(getDepartments(filters)),
        companyUsers: () => dispatch(getCompanyUsers(filters)),
        companyOwnershipTypes: () => dispatch(getCompanyOwnershipTypes()),
        workExceptionTypes: () => dispatch(getWorkExceptionTypes(filters)),
        taskTypes: () => dispatch(getTaskTypes()),
        taskStates: () => dispatch(getTaskStates()),
        taskSprints: () => dispatch(getTaskSprints(filters)),
        boardStates: () => dispatch(getBoardStates(filters)),
        projects: () => dispatch(getProjects(filters)),
        projectTasks: () => dispatch(getProjectTasks(filters)),
        roles: () => dispatch(getRoles()),
        userGroups: () => dispatch(getUserGroups(filters)),
        // @ts-ignore
        tasks: () => dispatch(getTasks(user, filters, { page_size: 1000, page_number: 1 })),
    };

    const onOpenMethod = () => {
        if (typeof onOpen === 'function') onOpen({ target: { name, value } });
        if (onLoadingMethod[dictionaryName] && typeof onLoadingMethod[dictionaryName] === 'function' && !dynamicOptions[dictionaryName]?.length)
            onLoadingMethod[dictionaryName]();
    };

    const valueFieldName = selectProps && selectProps.valueField ? selectProps.valueField : 'value';
    const textFieldName = selectProps && selectProps.textField ? selectProps.textField : 'text';
    let finalValue = value;

    let autocompleteOptions = dynamicOptions[dictionaryName]?.length ? dynamicOptions[dictionaryName] : [];
    if (skipId) {
        // @ts-ignore
        autocompleteOptions = autocompleteOptions.filter((item: any) => item.Id !== skipId);
    }

    if (!!value && !!text && !dynamicOptions[dictionaryName]?.length) {
        const fakeOption = {
            [valueFieldName]: value,
            [textFieldName]: text,
        };
        // @ts-ignore
        autocompleteOptions = [fakeOption];
    }

    if (autocompleteOptions?.length) {
        if (typeof value !== typeof autocompleteOptions[0]) {
            // @ts-ignore
            finalValue = autocompleteOptions.find((item) => item[valueFieldName as keyof IAsyncDictionaries] === value);
        } else {
            finalValue = undefined;
        }
    } else {
        finalValue = undefined;
    }

    return (
        <Autocomplete
            disablePortal={typeof disablePortal == 'boolean' ? disablePortal : true}
            key={finalValue}
            id={name + id}
            options={
                excludeOptions && excludeOptions.length && autocompleteOptions
                    ? // @ts-ignore
                      autocompleteOptions.filter(
                          (opt: any) => excludeOptions.findIndex((exOpt) => exOpt === opt[selectProps?.valueField || 'Id']) < 0,
                      )
                    : autocompleteOptions
            }
            getOptionLabel={(option) => option[textFieldName as keyof IAsyncDictionaries] || ''}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    variant={variant}
                    size={size}
                    required={required}
                    helperText={helperText}
                    error={error}
                />
            )}
            onError={(event) => (selectProps && selectProps.onError ? selectProps.onError(event) : null)}
            freeSolo={selectProps && selectProps.freeSolo ? selectProps.freeSolo : false}
            fullWidth
            groupBy={(option) => (selectProps && selectProps.groupBy ? selectProps.groupBy(option) : '')}
            multiple={multiple}
            disableCloseOnSelect={multiple}
            disableClearable={disableClearable}
            onChange={(event: any, selected: typeof finalValue) => {
                if (typeof onChange === 'function') onChange({ target: { name, value: selected ? selected[valueFieldName] : null } }, selected);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            onOpen={onOpenMethod}
            value={finalValue}
            noOptionsText={noOptionsText}
            disabled={disabled}
        />
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { companies } = dictSelectors.companies(state);
    const { departments } = dictSelectors.departments(state);
    const { companyUsers } = dictSelectors.companyUsers(state);
    const { companyOwnershipTypes } = dictSelectors.companyOwnershipTypes(state);
    const { workExceptionTypes } = dictSelectors.workExceptionTypes(state);
    const { taskTypes } = dictSelectors.taskTypes(state);
    const { taskStates } = dictSelectors.taskStates(state);
    const { taskSprints } = dictSelectors.taskSprints(state);
    const { boardStates } = dictSelectors.boardStates(state);
    const { projects } = dictSelectors.projects(state);
    const { projectTasks } = dictSelectors.projectTasks(state);
    const { roles } = dictSelectors.roles(state);
    const { userGroups } = dictSelectors.userGroups(state);
    const { tasks } = taskSelector(state);
    return {
        user,
        dynamicOptions: {
            companies,
            departments,
            companyUsers,
            companyOwnershipTypes,
            workExceptionTypes,
            taskTypes,
            taskStates,
            taskSprints,
            boardStates,
            projects,
            projectTasks,
            tasks,
            roles,
            userGroups,
        },
    };
};

const connector = connect(mapStateToProps);
type AutocompleteInputReduxProps = ConnectedProps<typeof connector> & IAutocompleteInput;

export default compose(connector)(AutocompleteInput);
