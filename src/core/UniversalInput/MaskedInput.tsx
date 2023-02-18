// @ts-nocheck
import React, { ReactNode } from 'react';
import InputMask from 'react-input-mask';

import TextField from '@mui/material/TextField';

import { phoneToInt } from '@helpers/methods';

export interface IMaskedInput {
    mode?: string;
    mask?: string;
    id?: string;
    name: string;
    label?: string;
    placeholder?: string;
    value: string;
    disabled?: boolean;
    onChange: (event: any, params?: any, fieldName?: string) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    required?: boolean;
    error?: boolean;
    autoComplete?: string;
    className?: string;
    errorText?: any;
    helperText?: any;
    InputProps?: any;
}

export const MaskedInput: React.FC<IMaskedInput> = ({
    mode,
    mask,
    label,
    value,
    error,
    className,
    required,
    variant = 'filled',
    size,
    onChange,
    onFocus,
    onBlur,
    name,
    autoComplete,
    helperText,
    placeholder,
    disabled,
    InputProps,
}) => {
    const actualMask = mask
        ? mask
        : mode === 'phone'
        ? '+7 (999) 999 99 99'
        : mode === 'inn'
        ? '9999999999'
        : mode === 'inn12'
        ? '999999999999'
        : mode === 'ogrn'
        ? '9999999999999'
        : mode === 'ogrn15'
        ? '999999999999999'
        : mode === 'kpp'
        ? '999999999'
        : mode === 'ekk'
        ? '9999999999'
        : mode === 'passport'
        ? '9999 999999'
        : mode === 'driver'
        ? '99 99 999999'
        : '';

    return (
        <InputMask
            mask={actualMask}
            value={value}
            disabled={disabled}
            onChange={(event: any) => {
                const value = event.target.value;
                const cleanValue = !mode
                    ? value
                    : mode === 'phone'
                    ? phoneToInt(value)
                    : mode === 'inn' || mode === 'inn12' || mode === 'ogrn' || mode === 'ogrn15' || mode === 'ekk' || mode === 'kpp' || mode === 'passport' || mode === 'driver'
                    ? value.replace(/\D/g, '')
                    : '';
                onChange({ target: { name: event.target.name, value: cleanValue } });
            }}
            onFocus={onFocus}
            onBlur={onBlur}
        >            
            {
                () => (
                <TextField
                    name={name}
                    label={label}
                    value={value}
                    variant={variant}
                    required={required}
                    disabled={disabled}
                    error={error}
                    size={size}
                    className={className}
                    placeholder={placeholder}
                    helperText={helperText}
                    autoComplete={autoComplete}
                    fullWidth
                    InputProps={InputProps}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            )}
        </InputMask>
    );
};
