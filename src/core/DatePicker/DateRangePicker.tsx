import React, { useState } from 'react';
import moment, { Moment } from 'moment';

import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// import { DatePicker, DatePickerView, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { momentToFormatString, stringToMoment, startOfDay, endOfDay } from '@helpers/dateHelper';

import 'moment/locale/ru';

interface IDateRangePicker {
    name: string;
    label?: string;
    views?: Array<'day' | 'month' | 'year'>;
    minDate?: Moment;
    maxDate?: Moment;
    values: string[];
    required?: boolean;
    error?: boolean;
    disabled?: boolean;
    format?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    className?: string;
    onChange: (newDate: any, name: string) => void;
    showEndIcon?: boolean;
    disablePast?: boolean;
    keyboard?: boolean;
    hideIcon?: boolean;
    fullWidth?: boolean;
    onBlur?: (newDate: any, name: string) => void;
}

export const DateRangePicker = ({
    name,
    label,
    values,
    required,
    error,
    disabled,
    onChange,
    onBlur,
    views,
    minDate,
    maxDate,
    variant = 'filled',
    className,
    showEndIcon,
    disablePast,
    keyboard = true,
    fullWidth = true,
}: IDateRangePicker) => {
    moment.locale('ru');
    const [min, max] = values;

    const onKeyDown = keyboard ? undefined : (e: any) => e.preventDefault();

    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    const startProps = !showEndIcon ? { open: startOpen, onOpen: () => setStartOpen(true), onClose: () => setStartOpen(false) } : {};
    const startTextFieldProps = !showEndIcon ? { onClick: (e: any) => setStartOpen(true), onKeyDown: onKeyDown } : {};

    const endProps = !showEndIcon ? { open: endOpen, onOpen: () => setEndOpen(true), onClose: () => setEndOpen(false) } : {};
    const endTextFieldProps = !showEndIcon ? { onClick: (e: any) => setEndOpen(true), onKeyDown: onKeyDown } : {};

    const endIcon = showEndIcon && (
        <InputAdornment position="start">
            <IconButton aria-label="datepicker calendar toggle">
                <CalendarTodayIcon />
            </IconButton>
        </InputAdornment>
    );

    const isInvalidDate = (dates: string[]) => {
        return !dates[0] || !dates[1] || dates[0] === 'Invalid date' || dates[1] === 'Invalid date';
    };

    const eventHandler = (newDates: [string, string], currentField: string, onEvent: (newDate: any, name: string) => void) => {
        if (isInvalidDate(newDates) || newDates[0] <= newDates[1]) {
            onEvent(newDates, name);
        } else {
            if (currentField === 'min') {
                onEvent([newDates[0], momentToFormatString(endOfDay(stringToMoment(newDates[0])))], name);
            } else {
                onEvent([momentToFormatString(startOfDay(stringToMoment(newDates[1]))), newDates[1]], name);
            }
        }
    };

    const onDateChange = (newDates: [string, string], currentField: string) => {
        if (typeof onChange == 'function') {
            eventHandler(newDates, currentField, onChange);
        }
    };

    const onDateBlur = (stringDate: string, currentField: string) => {
        const reformatStringDate =
            stringDate.length === 10 ? `${stringDate.slice(6, 10)}-${stringDate.slice(3, 5)}-${stringDate.slice(0, 2)}` : stringDate;
        const newDates: [string, string] = currentField === 'min' ? [reformatStringDate, max] : [min, reformatStringDate];
        if (typeof onBlur == 'function') {
            eventHandler(newDates, currentField, onBlur);
        }
    };

    return (
        <FormControl className={className} variant={variant} fullWidth={fullWidth} error={error} required={required}>
            <InputLabel required={required} error={error || (required && (isInvalidDate([min, max]) || !min || !max))}>
                {label}
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterMoment} locale={'ru'}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <DatePicker
                            value={min || ''}
                            onChange={(date: any) => {
                                onDateChange([date ? momentToFormatString(date) : '', max], 'min');
                            }}
                            views={views || ['year', 'day']}
                            minDate={minDate}
                            maxDate={maxDate && moment.min([moment(max), maxDate])}
                            InputProps={{
                                endAdornment: endIcon,
                            }}
                            disabled={disabled}
                            disablePast={disablePast}
                            mask="__.__.____"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant={variant}
                                    required={required}
                                    error={error || (required && !min)}
                                    onBlur={(e) => onDateBlur(e.target.value, 'min')}
                                    {...startTextFieldProps}
                                />
                            )}
                            disableOpenPicker={!showEndIcon}
                            {...startProps}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <DatePicker
                            value={max || ''}
                            onChange={(date: any) => onDateChange([min, date ? momentToFormatString(date) : ''], 'max')}
                            views={views || ['year', 'day']}
                            minDate={minDate && moment.max([moment(min), minDate])}
                            maxDate={maxDate}
                            InputProps={{
                                endAdornment: endIcon,
                            }}
                            disabled={disabled}
                            disablePast={disablePast}
                            mask="__.__.____"
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant={variant}
                                    required={required}
                                    error={error || (required && !max)}
                                    onBlur={(e) => onDateBlur(e.target.value, 'max')}
                                    {...endTextFieldProps}
                                />
                            )}
                            disableOpenPicker={!showEndIcon}
                            {...endProps}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </FormControl>
    );
};
