import React from 'react';

// moment
import moment, { Moment } from 'moment';
import { stringToMoment } from '@helpers/dateHelper';
import 'moment/locale/ru';

import TextField from '@mui/material/TextField';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

// date adapter
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import format from 'date-fns/format';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from 'date-fns/locale/ru';

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date: any) {
        return format(date, 'LLLL', { locale: this.locale });
    }
}

interface IDateTimePickerInput {
    name: string;
    label?: string;
    placeholder?: string;
    format?: string;
    variant?: 'outlined' | 'standard' | 'filled';
    views?: Array<'day' | 'hours' | 'minutes' | 'month' | 'seconds' | 'year'>;
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

export const DateTimePickerInput = ({
    name,
    value,
    onChange,
    onBlur,
    label,
    placeholder,
    views,
    minDate,
    maxDate,
    format = 'DD.MM.YYYY HH:mm',
    variant = 'filled',
    hideIcon,
    error,
    required,
    disabled,
    disablePast,
}: IDateTimePickerInput) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} utils={RuLocalizedUtils} locale={ruLocale}>
            <DateTimePicker
                renderInput={(params) => <TextField
                    {...params}
                    variant={variant}
                    required={required}
                    error={error || required && !value} />}
                value={value}
                onChange={(date: any) => {
                    if (isFinite(date) && date instanceof Date) {
                        const dateMoment = moment(date);
                        if (typeof onChange == 'function') onChange(dateMoment, name);
                        if (typeof onBlur == 'function') onBlur({ target: { name, value } });
                    }
                }}
                label={label || ''}
                ampm={false}
                mask="__.__.____ __:__"
                disableMaskedInput={false}
                minDate={minDate}
                maxDate={maxDate}
                disabled={disabled}
                disablePast={disablePast}
            />
        </LocalizationProvider>
    );

    // return (
    //     <LocalizationProvider dateAdapter={AdapterMoment} locale={'ru'}>
    //         <DateTimePicker
    //             //value={value ? stringToMoment(value) : ""}
    //             value={v}
    //             //name={name}
    //             //placeholder={placeholder}
    //             label={label || ''}
    //             //format={format}
    //             // onChange={(date: any) => {
    //             //     if (typeof onChange == 'function') onChange(date, name);
    //             //     if (typeof onBlur == 'function') onBlur({ target: { name, value } });
    //             // }}
    //             onChange={(newValue) => {
    //                 setV(newValue);
    //             }}
    //             //views={views || []}
    //             minDate={minDate}
    //             maxDate={maxDate}
    //             //inputVariant={variant}
    //             //variant="inline"
    //             ampm={false}
    //             // InputProps={{
    //             //     endAdornment: !hideIcon && (
    //             //         <InputAdornment position="start">
    //             //             <IconButton aria-label="datepicker calendar toggle">
    //             //                 <CalendarTodayIcon />
    //             //             </IconButton>
    //             //         </InputAdornment>
    //             //     ),
    //             // }}
    //             //error={error}
    //             //required={required}
    //             disabled={disabled}
    //             disablePast={disablePast}
    //             renderInput={(params) => <TextField {...params} variant={variant} />}
    //         />
    //     </LocalizationProvider>
    // );
};
