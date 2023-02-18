import React from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

import { Loader } from '@core/Loader/Loader';
import { IAsyncDictionaries } from '@helpers/dictionariesHelper';
import { ISelectProps } from '@core/UniversalInput/methods';

export interface ISelectInput {
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    value?: any;
    disabled?: boolean;
    onChange?: (event: any, params?: any) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    onOpen?: (event: any) => void;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    multiple?: boolean;
    required?: boolean;
    error?: boolean;
    className?: string;
    options?: Array<IAsyncDictionaries>;
    selectProps?: ISelectProps;
    errorText?: any;
    helperText?: any;
    isLoading?: boolean;
}

export const SelectInput: React.FC<ISelectInput> = ({
    label,
    value,
    error,
    className,
    required,
    selectProps,
    options,
    variant = 'filled',
    size,
    multiple,
    onChange,
    onFocus,
    onBlur,
    onOpen,
    name,
    errorText,
    helperText,
    placeholder,
    disabled,
    isLoading,
}) => {
    return (
        <FormControl className={className} variant={variant} fullWidth size={size} error={error || required && !value} required={required}>
            {!!label && <InputLabel>{label}</InputLabel>}
            <Select
                name={name}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                multiple={multiple}
                placeholder={placeholder !== 'none' ? placeholder : undefined}
                MenuProps={{
                    disableScrollLock: true,
                }}
                onOpen={onOpen}
                disabled={disabled}
                error={error || required && !value}
                required={required}
            >
                {placeholder !== 'none' && (placeholder || label) && <MenuItem value="">{placeholder || label}</MenuItem>}
                {options?.map((item: any) => (
                    <MenuItem
                        key={selectProps && selectProps.valueField ? selectProps.valueField : item.id}
                        value={selectProps && selectProps.valueField ? selectProps.valueField : item.value}
                    >
                        {selectProps && selectProps.textField ? selectProps.textField : item.text}
                    </MenuItem>
                ))}
                {isLoading ? <Loader /> : null}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error && errorText}
        </FormControl>
    );
};
