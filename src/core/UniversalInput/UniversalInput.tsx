import React from 'react';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ColorPicker from '@core/ColorPicker/ColorPicker';
import InputAdornment from '@mui/material/InputAdornment';
import { getHoursMaskByMinutes, getTimeMaskByStr, parseTimeMaskToMinutes } from '@helpers/dateHelper';

export interface IUniversalInput {
    id?: string;
    type?: string;
    name: string;
    label?: string;
    placeholder?: string;
    value?: any;
    disabled?: boolean;
    onChange: (event: any, params?: any, fieldName?: string) => void;
    onFocus?: (event: any) => void;
    onBlur?: (event: any) => void;
    className?: string;
    error?: boolean;
    variant?: 'outlined' | 'standard' | 'filled';
    size?: 'small' | 'medium';
    multiline?: boolean;
    rows?: number;
    multiple?: boolean;
    helperText?: string;
    inputProps?: {
        max?: number;
        min?: number;
        step?: number;
    };
    required?: boolean;
    limitChars?: number;
    sx?: any;
}

export const autoCompleteRule = 'off';

const baseInputProps = {};

const getFullInputProps = (inputProps: any) => {
    return inputProps ? { ...baseInputProps, ...inputProps } : baseInputProps;
};

const UniversalInput: React.FC<IUniversalInput> = ({
    id,
    type = 'input',
    name,
    label,
    placeholder,
    value,
    onChange,
    className,
    error,
    inputProps,
    variant = 'filled',
    multiline,
    rows,
    required,
    disabled,
    helperText,
    onFocus,
    onBlur,
    size = 'small',
    limitChars,
    sx
}) => {
    if (type === 'number') {
        return (
            <TextField
                id={name + id}
                name={name}
                type={'number'}
                placeholder={placeholder}
                label={label}
                value={value || ''}
                variant={variant}
                size={size}
                fullWidth
                required={required}
                className={className}
                onChange={(event: any) => {
                    onChange({ target: { name, value: +event.target.value } });
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
                autoComplete={autoCompleteRule}
                inputProps={getFullInputProps(inputProps)}
            />
        );
    } else if (type === 'checkbox') {
        return (
            <FormControlLabel
                control={
                    <Checkbox
                        id={name + id}
                        name={name}
                        checked={value}
                        placeholder={placeholder}
                        color="primary"
                        size={size}
                        required={required}
                        className={className}
                        onChange={(event) => onChange({ target: { name: event.target.name, value: event.target.checked } })}
                    />
                }
                label={label}
            />
        );
    } else if (type === 'hours') {
        return (
            <TextField
                name={name}
                label={label}
                fullWidth
                error={error}
                variant={variant}
                placeholder={placeholder || 'чч:мм'}
                defaultValue={value ? getHoursMaskByMinutes(value) : ''}
                className={className}
                sx={sx}
                onBlur={(event) => {
                    const resultValue = getTimeMaskByStr(event.target.value);
                    event.target.value = resultValue;
                    if (typeof onBlur === 'function')
                        onBlur({
                            target: {
                                name: event.target.name,
                                value: parseTimeMaskToMinutes(resultValue),
                            },
                        });
                }}
            />
        );
    } else if (type === 'datetime') {
        return (
            <TextField
                name={name}
                label={label}
                fullWidth
                type={'datetime-local'}
                error={error}
                value={value}
                variant={variant}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event) => onChange({ target: { name: event.target.name, value: event.target.value } })}
                //maxDate={value}
            />
        );
    } else if (type === 'color') {
        return (
            <TextField
                id={name + id}
                name={name}
                placeholder={placeholder}
                label={label}
                value={value}
                variant={variant}
                size={size}
                fullWidth
                disabled={disabled}
                required={required}
                className={className}
                onChange={(event) => {
                    if (!limitChars || (!!limitChars && limitChars - ((event.target.value && event.target.value.length) || 0) >= 0)) {
                        onChange({ target: { name: event.target.name, value: event.target.value } });
                    } else {
                        event.target.value = event.target.value.slice(0, limitChars);
                        onChange({ target: { name: event.target.name, value: event.target.value } });
                    }
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                error={error}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ marginTop: 0 }}>
                            <ColorPicker
                                color={`#${value}`}
                                onChange={(newColor) => onChange({ target: { name: name, value: newColor.slice(1) } })}
                            />{' '}
                        </InputAdornment>
                    ),
                }}
            />
        );
    }

    return (
        <TextField
            id={name + id}
            name={name}
            placeholder={placeholder}
            label={label}
            value={value}
            variant={variant}
            size={size}
            fullWidth
            disabled={disabled}
            required={required}
            className={className}
            sx={sx}
            onChange={(event) => {
                if (!limitChars || (!!limitChars && limitChars - ((event.target.value && event.target.value.length) || 0) >= 0)) {
                    onChange({ target: { name: event.target.name, value: event.target.value } });
                } else {
                    event.target.value = event.target.value.slice(0, limitChars);
                    onChange({ target: { name: event.target.name, value: event.target.value } });
                }
            }}
            onFocus={onFocus}
            onBlur={onBlur}
            error={error}
            multiline={multiline}
            rows={rows}
            autoComplete={autoCompleteRule}
            inputProps={getFullInputProps(inputProps)}
            helperText={limitChars ? `Осталось символов: ${limitChars - ((value && value.length) || 0)}` : helperText}
        />
    );
};

export default UniversalInput;
