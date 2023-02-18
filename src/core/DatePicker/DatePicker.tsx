import React from 'react';
import moment, { Moment } from 'moment';
// import MomentUtils from '@date-io/moment';

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import 'moment/locale/ru';

import { stringToMoment } from '@helpers/dateHelper';

interface IDatePickerInput {
    name: string;
    label?: string;
    placeholder?: string;
    format?: string;
    variant?: 'outlined' | 'standard' | 'filled' | undefined;
    views?: Array<'day' | 'month' | 'year'>;
    minDate?: Moment;
    maxDate?: Moment;
    value: string | null;
    onChange?: (newDate: any, name: string) => void;
    onBlur?: (event: any) => void;
    hideIcon?: boolean;
    error?: boolean;
    required?: boolean;
    disabled?: boolean;
    disablePast?: boolean;
}

export const DatePickerInput = ({
    name,
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    views,
    minDate,
    maxDate,
    format = 'D.MM.YYYY',
    variant = 'filled',
    hideIcon,
    error,
    required,
    disabled,
    disablePast,
}: IDatePickerInput) => {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment} locale={'ru'}>
            <DatePicker
                value={value ? stringToMoment(value) : null}
                label={label || ''}
                onChange={(date: any) => {
                    if (typeof onChange == 'function') onChange(date, name);
                    if (typeof onBlur == 'function') onBlur({ target: { name, value } });
                }}
                views={views || ['year', 'day']}
                minDate={minDate}
                maxDate={maxDate}
                InputProps={{
                    endAdornment: !hideIcon && (
                        <InputAdornment position="start">
                            <IconButton aria-label="datepicker calendar toggle">
                                <CalendarTodayIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                mask="__.__.____"
                disabled={disabled}
                disablePast={disablePast}
                renderInput={(params) => <TextField {...params} variant={variant} required={required} error={error || (required && !value)} />}
            />
        </LocalizationProvider>
    );
};
