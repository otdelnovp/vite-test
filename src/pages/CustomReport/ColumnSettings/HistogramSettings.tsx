import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { ICustomReportElement, ITableElement, ITableFieldElement } from '../model';
import { getOptionsTablesSelected } from '../methods';
import { sx } from '../styles';

interface IHistogramSettingsProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const HistogramSettings = ({ body, setBody, tableList }: IHistogramSettingsProps) => {
    const tableOptions = getOptionsTablesSelected(body, tableList);

    const getFieldOptions = (field: ITableFieldElement | undefined) => {
        let options: { label: string; value: string }[] = [];
        field &&
            tableList.forEach((table) => {
                if (table.name === field.table) {
                    table.columns.forEach((column) =>
                        options.push({
                            label: column.title,
                            value: column.name,
                        }),
                    );
                }
            });
        return options;
    };

    const onFieldChange = (fieldType: string, fieldName: string, newValue: string) => {
        const foundField = body.tableFields.find((item) => item.fieldType === fieldType);
        if (foundField) {
            const newTableFields = body.tableFields.map((item) => {
                if (item.fieldType === fieldType) {
                    return { ...item, [fieldName]: newValue };
                }
                return { ...item };
            });
            setBody({ ...body, tableFields: [...newTableFields] });
        } else {
            setBody({
                ...body,
                tableFields: [
                    ...body.tableFields,
                    {
                        table: '',
                        field: '',
                        title: '',
                        [fieldName]: newValue,
                        fieldType: fieldType,
                        order: body.tableFields.length + 1,
                    },
                ],
            });
        }
    };

    const valueField = body.tableFields.find((item) => item.fieldType === 'chartValue');
    const nameField = body.tableFields.find((item) => item.fieldType === 'chartName');
    const groupField = body.tableFields.find((item) => item.fieldType === 'chartGroup');

    const valueFieldOptions = getFieldOptions(valueField);
    const nameFieldOptions = getFieldOptions(nameField);
    const groupFieldOptions = getFieldOptions(groupField);

    return (
        <Table sx={sx.table}>
            <TableHead>
                <TableRow>
                    <TableCell sx={{ width: '15%' }}>Тип поля</TableCell>
                    <TableCell sx={{ width: '30%' }}>Таблица</TableCell>
                    <TableCell sx={{ width: '30%' }}>Поле</TableCell>
                    <TableCell sx={{ width: '25%' }}>Наименование колонки</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Typography>Показатель</Typography>
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => nameField && found.value === nameField.table) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartName', 'table', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={nameFieldOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={nameFieldOptions.find((found) => nameField && found.value === nameField.field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartName', 'field', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            value={(nameField && nameField.title) || ''}
                            onChange={(e: any) => {
                                onFieldChange('chartName', 'title', e.target.value || '');
                            }}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Значение</Typography>
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => valueField && found.value === valueField.table) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartValue', 'table', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={valueFieldOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={valueFieldOptions.find((found) => valueField && found.value === valueField.field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartValue', 'field', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            value={(valueField && valueField.title) || ''}
                            onChange={(e: any) => {
                                onFieldChange('chartValue', 'title', e.target.value || '');
                            }}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Группировка</Typography>
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => groupField && found.value === groupField.table) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartGroup', 'table', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={groupFieldOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={groupFieldOptions.find((found) => groupField && found.value === groupField.field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) => {
                                onFieldChange('chartGroup', 'field', value?.value || '');
                            }}
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            value={(groupField && groupField.title) || ''}
                            onChange={(e: any) => {
                                onFieldChange('chartGroup', 'title', e.target.value || '');
                            }}
                        />
                    </TableCell>
                </TableRow>
                <TableRow></TableRow>
            </TableBody>
        </Table>
    );
};

export default HistogramSettings;
