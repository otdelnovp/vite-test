import React from 'react';

import Grid from '@mui/material/Grid';

import { DatePickerInput } from '@core/DatePicker/DatePicker';
import { DateRangePicker } from '@core/DatePicker/DateRangePicker';
import AutocompleteInput from '@core/UniversalInput/AutocompleteInput';
import UniversalInput from '@core/UniversalInput/UniversalInput';

import { IFormField } from './models';
import { MaskedInput } from '@core/UniversalInput/MaskedInput';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import { CompanySearchInput } from '@core/CompanySearchInput/CompanySearchInput';
import { DateTimePickerInput } from '@core/DatePicker/DateTimePicker';
import { AddressSearchInput } from '@core/AddressSearchInput/AddressSearchInput';

import { IDictionaryElement, IDictionaryListElement } from '@helpers/dictionaryEditHelper';
import { momentToFormatString, startOfDay } from '@helpers/dateHelper';
import { IAddressType } from '@core/AddressSearchInput/methods';
import { IUserData } from '@helpers/authHelper';
import { validateEmail } from '@helpers/methods';

import moment from 'moment';

export const getElementFieldsByModel = (
    model: IFormField[],
    body: IDictionaryListElement | IDictionaryElement,
    onFieldChange: (event: any, fieldName?: string) => void,
    user: IUserData | null,
    onDateRangeChange?: (newDates: string[], name: string) => void,
    onDateRangeBlur?: (newDates: string[], name: string) => void,
) => {
    const elementFields = model.map((item) => {
        const {
            hidden,
            gridSize,
            required,
            type,
            placeholder,
            dictionaryName,
            fieldText,
            options,
            skipCurrentId,
            selectProps,
            minDate,
            maxDate,
            filterFields,
            dates,
        } = item.config;

        if (hidden) {
            return null;
        }

        type ObjectKey = keyof typeof body;
        const nameKey = item.name as ObjectKey;
        const textKey = fieldText as ObjectKey;

        let filters = {};
        if (filterFields && filterFields.length) {
            filterFields.forEach((filterField) => {
                const filterFieldKey = filterField as ObjectKey;
                filters[filterFieldKey] = body[filterFieldKey];
            });
        }

        const dateFromKey = dates ? (dates[0] as ObjectKey) : (item.name as ObjectKey);
        const dateToKey = dates ? (dates[1] as ObjectKey) : (item.name as ObjectKey);

        const defaultValue = type === 'checkbox' ? false : '';

        const minDateKey = minDate as ObjectKey;
        const maxDateKey = maxDate as ObjectKey;
        const minDateValue = minDateKey && body[minDateKey] ? moment(body[minDateKey]) : undefined;
        const maxDateValue = maxDateKey && body[maxDateKey] ? moment(body[maxDateKey]) : undefined;

        switch (item.input) {
            case 'autocomplete':
                if (dictionaryName) {
                    return (
                        <Grid item xs={gridSize} key={`${item.name}Key`}>
                            <AutocompleteInput
                                name={item.name}
                                required={required}
                                label={item.label}
                                placeholder={placeholder}
                                dictionaryName={dictionaryName}
                                selectProps={
                                    selectProps
                                        ? selectProps
                                        : {
                                              valueField: 'Id',
                                              textField: 'Name',
                                          }
                                }
                                skipId={skipCurrentId ? ('Id' in body ? body.Id : body.id) : undefined}
                                value={body[nameKey]}
                                filters={filters}
                                text={body[textKey]}
                                onChange={onFieldChange}
                                error={required && !body[nameKey]}
                                disablePortal={false}
                            />
                        </Grid>
                    );
                }
                break;
            case 'date-picker':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <DatePickerInput
                            name={item.name}
                            required={required}
                            value={body[nameKey] || ''}
                            label={item.label}
                            minDate={minDateValue}
                            maxDate={maxDateValue}
                            onChange={(date: any, fieldName: string) =>
                                onFieldChange({
                                    target: { name: fieldName, value: date ? momentToFormatString(startOfDay(date)) : null },
                                })
                            }
                            error={required && !body[nameKey]}
                        />
                    </Grid>
                );
            case 'date-range-picker':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <DateRangePicker
                            name={item.name}
                            required={required}
                            label={item.label}
                            values={[body[dateFromKey] || '', body[dateToKey] || '']}
                            onChange={(newDates: string[]) => {
                                if (dates && onDateRangeChange) {
                                    onDateRangeChange(
                                        [
                                            newDates[0] === 'Invalid date' ? newDates[0] : newDates[0].slice(0, 10),
                                            newDates[1] === 'Invalid date' ? newDates[1] : newDates[1].slice(0, 10),
                                        ],
                                        item.name,
                                    );
                                }
                            }}
                            onBlur={(newDates: string[]) => {
                                if (dates && onDateRangeBlur) {
                                    onDateRangeBlur(
                                        [
                                            newDates[0] === 'Invalid date' ? newDates[0] : newDates[0].slice(0, 10),
                                            newDates[1] === 'Invalid date' ? newDates[1] : newDates[1].slice(0, 10),
                                        ],
                                        item.name,
                                    );
                                }
                            }}
                            keyboard={false}
                            showEndIcon={true}
                            error={required && !(body[dateFromKey] && body[dateToKey])}
                            fullWidth={false}
                        />
                    </Grid>
                );
            case 'datetime-picker':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <DateTimePickerInput
                            name={item.name}
                            required={required}
                            value={body[nameKey] || ''}
                            label={item.label}
                            views={['day', 'hours', 'minutes']}
                            onChange={(date: any, fieldName: string) =>
                                onFieldChange({
                                    target: { name: fieldName, value: momentToFormatString(date) },
                                })
                            }
                            error={required && !body[nameKey]}
                        />
                    </Grid>
                );
            case 'masked':
                let mode = type;
                // @ts-ignore
                if (type === 'inn' && body.OwnershipTypeCode) {
                    // @ts-ignore
                    mode = body.OwnershipTypeCode === 'ИП' ? 'inn12' : 'inn';
                }
                // @ts-ignore
                if (type === 'ogrn' && body.OwnershipTypeCode) {
                    // @ts-ignore
                    mode = body.OwnershipTypeCode === 'ИП' ? 'ogrn15' : 'ogrn';
                }

                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <MaskedInput
                            mode={mode}
                            name={item.name}
                            required={required}
                            label={item.label}
                            value={body[nameKey] || ''}
                            onChange={onFieldChange}
                            error={required && !body[nameKey]}
                        />
                    </Grid>
                );
            case 'select':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <SelectInput
                            name={item.name}
                            label={item.label}
                            placeholder="Выберите статус"
                            value={body[nameKey] || ''}
                            required={required}
                            options={options}
                            onChange={onFieldChange}
                            onBlur={onFieldChange}
                        />
                    </Grid>
                );
            case 'company-search':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <CompanySearchInput
                            name={item.name}
                            label={item.label}
                            inputType={type}
                            defaultValue={body[nameKey] || ''}
                            onChange={({ target: { value: newCompanyData } }) => {
                                const onChangeParams = {
                                    target: { name: item.name, value: newCompanyData },
                                };
                                onFieldChange(onChangeParams);
                            }}
                            noOptionsText="Не найдена компания"
                            loadingText="Загрузка..."
                            required={required}
                            error={required && !body[nameKey]}
                        />
                    </Grid>
                );

            case 'address-search':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <AddressSearchInput
                            name={item.name}
                            label={item.label}
                            defaultValue={body[nameKey] || ''}
                            onChange={(newAddressData: IAddressType | null) => {
                                const onChangeParams = {
                                    target: { name: item.name, value: newAddressData?.PointAddress },
                                };
                                onFieldChange(onChangeParams);
                            }}
                            noOptionsText="Не найден адрес"
                            loadingText="Загрузка..."
                        />
                    </Grid>
                );

            case 'email':
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <UniversalInput
                            type={type}
                            name={item.name}
                            id={`${item.name}Id`}
                            required={required}
                            label={item.label}
                            value={body[nameKey] || defaultValue}
                            onChange={onFieldChange}
                            onBlur={(e) => onFieldChange(e)}
                            error={(required && !body[nameKey]) || (body[nameKey] && !validateEmail(body[nameKey]))}
                        />
                    </Grid>
                );

            default: // universal
                return (
                    <Grid item xs={gridSize} key={`${item.name}Key`}>
                        <UniversalInput
                            type={type}
                            name={item.name}
                            id={`${item.name}Id`}
                            required={required}
                            label={item.label}
                            value={body[nameKey] || defaultValue}
                            onChange={onFieldChange}
                            onBlur={(e) => onFieldChange(e)}
                            error={required && !body[nameKey]}
                        />
                    </Grid>
                );
                break;
        }
    });
    return elementFields;
};

const errorMsgAppend = (errorMsg: string, newError: string) => {
    return errorMsg + (!errorMsg ? '' : '. ') + newError;
};

export const checkFormFullfilled = (model: IFormField[], body: any, companyId?: string) => {
    let errorMsg = '';
    let problemDates: string[] = [];
    type ObjectKey = keyof typeof body;
    model.forEach((item) => {
        const nameKey = item.name as ObjectKey;

        // required
        if (item.config.required) {
            if (item.input === 'date-range-picker' && item.config.dates) {
                const [min, max] = item.config.dates;
                const minKey = min as ObjectKey;
                const maxKey = max as ObjectKey;
                if (!body[minKey] || !body[maxKey] || body[minKey] === 'Invalid date' || body[maxKey] === 'Invalid date') {
                    errorMsg = errorMsgAppend(errorMsg, `Не заполнен интервал дат: "${item.label}"`);
                }
            } else if (!body[nameKey]) {
                errorMsg = errorMsgAppend(errorMsg, `Не заполнено значение: "${item.label}"`);
            }
        }

        // dates
        const minDateKey = item.config.minDate as ObjectKey;
        const maxDateKey = item.config.maxDate as ObjectKey;
        if (item.config.minDate && body[minDateKey] && body[nameKey] < body[minDateKey]) {
            if (!problemDates.find((problemDate) => problemDate === item.name)) {
                const anotherDate = model.find((dateItem) => dateItem.name === item.config.minDate);
                errorMsg = errorMsgAppend(errorMsg, `Значение "${item.label}" меньше, чем "${anotherDate?.label}"`);
                anotherDate && problemDates.push(anotherDate?.name);
            }
        }
        if (item.config.maxDate && body[maxDateKey] && body[nameKey] > body[maxDateKey]) {
            if (!problemDates.find((problemDate) => problemDate === item.name)) {
                const anotherDate = model.find((dateItem) => dateItem.name === item.config.maxDate);
                errorMsg = errorMsgAppend(errorMsg, `Значение "${item.label}" больше, чем "${anotherDate?.label}"`);
                anotherDate && problemDates.push(anotherDate?.name);
            }
        }

        //email
        if (item.input === 'email' && body[nameKey] && !validateEmail(body[nameKey])) {
            errorMsg = errorMsgAppend(errorMsg, `Значение "${item.label}" не является корректным адресом электронной почты.`);
        }
    });

    // supplier and customer
    const customerIdField = model.find((item) => item.name === 'CustomerId');
    const supplierIdField = model.find((item) => item.name === 'SupplierId');
    if (customerIdField && supplierIdField) {
        const customerIdKey = customerIdField.name as ObjectKey;
        const supplierIdKey = supplierIdField.name as ObjectKey;
        if (body[customerIdKey] && body[supplierIdKey] && body[customerIdKey] === body[supplierIdKey]) {
            errorMsg = errorMsgAppend(errorMsg, `Поставщик и покупатель не должны совпадать.`);
        }
        if (companyId && body[customerIdKey] && body[supplierIdKey] && body[customerIdKey] !== companyId && body[supplierIdKey] !== companyId) {
            errorMsg = errorMsgAppend(errorMsg, `Поставщик или покупатель должен быть текущей редактируемой организацией.`);
        }
    }

    return errorMsg;
};

