import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';

import { RootState } from '@services/index';
import { getCompanyUsers, dictSelectors } from '@services/dictionaryService';
import { IUserData } from '@helpers/authHelper';

import { SelectInput } from '@core/UniversalInput/SelectInput';
import { ISelectProps, prepareOptionsForInput } from '@core/UniversalInput/methods';

export interface ISelectDynamic {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    value?: any;
    text?: string;
    disabled?: boolean;
    onChange?: (event: any, params?: any, fieldName?: string) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onOpen?: (event: any) => void;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    multiple?: boolean;
    required?: boolean;
    error?: boolean;
    className?: string;
    selectProps?: ISelectProps;
    errorText?: any;
    dictionaryName: 'companyUsers';
    user?: IUserData | null;
}
const SelectDynamic = ({
    label,
    value,
    text,
    error,
    className,
    required,
    selectProps,
    variant,
    size,
    multiple,
    dictionaryName,
    onChange,
    onFocus,
    onBlur,
    onOpen,
    name,
    errorText,
    placeholder,
    disabled,
    dynamicOptions,
    user,
}: SelectDynamicReduxProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const onLoadingMethod = {
        companyUsers: () => dispatch(getCompanyUsers({ org_id: user?.CompanyId })),
    };

    const options = prepareOptionsForInput(dynamicOptions[dictionaryName], selectProps, {
        id: value,
        value,
        text: text || '',
    });

    const onOpenMethod = () => {
        if (typeof onOpen === 'function') onOpen({ target: { name, value } });
        if (onLoadingMethod[dictionaryName] && typeof onLoadingMethod[dictionaryName] === 'function' && !dynamicOptions[dictionaryName]?.length)
            onLoadingMethod[dictionaryName]();
    };

    return (
        <SelectInput
            name={name}
            label={label}
            placeholder={placeholder}
            value={value || ''}
            options={options}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onOpen={onOpenMethod}
            required={required}
            error={error}
            variant={variant}
            className={className}
            size={size}
            multiple={multiple}
            errorText={errorText}
            disabled={disabled}
            isLoading={!options?.length}
        />
    );
};

const mapStateToProps = (state: RootState) => {
    const { companyUsers } = dictSelectors.companyUsers(state);
    return {
        dynamicOptions: {
            companyUsers,
        },
    };
};

const connector = connect(mapStateToProps);
type SelectDynamicReduxProps = ConnectedProps<typeof connector> & ISelectDynamic;

export default compose(connector)(SelectDynamic);
