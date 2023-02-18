import React, { useEffect } from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';

import ClearIcon from '@mui/icons-material/Clear';
import AddBoxIcon from '@mui/icons-material/AddBox';

import { IConditionElement, ICustomReportElement, ITableElement } from '../model';
import { getOptionsTablesSelected } from '../methods';
import { updateConditionParameters } from './methods';

import { sx } from '../styles';

import { customReport_TableList } from '../testData/testData_CustomReport';

const comparsionTypeOptions = [
    { value: 'equal', label: 'Равно' },
    { value: 'not_equal', label: 'Не равно' },
    { value: 'more', label: 'Больше' },
    { value: 'less', label: 'Меньше' },
    { value: 'more_or_equal', label: 'Больше или равно' },
    { value: 'less_or_equal', label: 'Меньше или равно' },
];

const defaultCondition: IConditionElement = {
    table: '',
    field: '',
    comparsionType: 'equal',
    value: '',
};

interface IConditionsProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const Conditions = ({ body, setBody, tableList }: IConditionsProps) => {
    const tableOptions = getOptionsTablesSelected(body, tableList);

    const addCondition = () => {
        setBody({ ...body, conditions: [...body.conditions, { ...defaultCondition }] });
    };

    const deleteCondition = (deleteIndex: number) => {
        const newConditions: IConditionElement[] = [];
        body.conditions.forEach((item, index) => {
            if (index !== deleteIndex) {
                newConditions.push({ ...item });
            }
        });

        setBody({ ...body, conditions: newConditions });
    };

    const onChangeCondition = (relationIndex: number, field: string, value: string | null) => {
        const newConditions = body.conditions.map((item, index) => {
            if (relationIndex === index) {
                return { ...item, [field]: value };
            }
            return { ...item };
        });
        setBody({ ...body, conditions: [...newConditions] });
    };

    useEffect(() => {
        updateConditionParameters(body, setBody);
    }, [body]);

    const getConditions = () => {
        return body.conditions.map((item, index) => {
            let tableFieldsOptions: { label: string; value: string }[] = [];

            customReport_TableList.forEach((table) => {
                if (table.name === item.table) {
                    table.columns.forEach((column) =>
                        tableFieldsOptions.push({
                            label: column.title,
                            value: column.name,
                        }),
                    );
                }
            });

            return (
                <TableRow>
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => found.value === item.table) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                value && onChangeCondition(index, 'table', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableFieldsOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableFieldsOptions.find((found) => found.value === item.field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeCondition(index, 'field', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={comparsionTypeOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={comparsionTypeOptions.find((found) => found.value === item.comparsionType) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeCondition(index, 'comparsionType', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            value={item.value}
                            onChange={(e: any) => onChangeCondition(index, 'value', e.target.value)}
                        />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                        <Tooltip title="Удалить строку">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    deleteCondition(index);
                                }}
                            >
                                <ClearIcon sx={{ color: '#aa0000' }} />
                            </IconButton>
                        </Tooltip>
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <React.Fragment>
            <Paper sx={sx.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table sx={sx.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: '20%' }}>Таблица</TableCell>
                                    <TableCell sx={{ width: '20%' }}>Поле</TableCell>
                                    <TableCell sx={{ width: '15%' }}>Условие</TableCell>
                                    <TableCell sx={{ width: '40%' }}>Значение</TableCell>
                                    <TableCell sx={{ width: '5%' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getConditions()}
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell sx={{ width: '5%', textAlign: 'right' }}>
                                        <Tooltip title="Добавить строку">
                                            <IconButton size="small" onClick={addCondition}>
                                                <AddBoxIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default Conditions;
