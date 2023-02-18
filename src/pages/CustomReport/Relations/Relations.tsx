import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
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

import { ICustomReportElement, IRelationElement, ITableElement } from '../model';
import { getOptionsTablesSelected } from '../methods';
import { sx } from '../styles';

const joinTypeOptions = [
    { value: 'left', label: 'Левое' },
    { value: 'right', label: 'Правое' },
    { value: 'full', label: 'Полное' },
    { value: 'inner', label: 'Внутреннее' },
];

const comparsionTypeOptions = [
    { value: 'equal', label: 'Равно' },
    { value: 'not_equal', label: 'Не равно' },
    { value: 'more', label: 'Больше' },
    { value: 'less', label: 'Меньше' },
    { value: 'more_or_equal', label: 'Больше или равно' },
    { value: 'less_or_equal', label: 'Меньше или равно' },
];

const defaultRelation: IRelationElement = {
    table1: '',
    joinType: 'inner',
    table2: '',
    table1Field: '',
    comparsionType: 'equal',
    table2Field: '',
};

interface IRelationsProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const Relations = ({ body, setBody, tableList }: IRelationsProps) => {
    const tableOptions = getOptionsTablesSelected(body, tableList);

    const addRelation = () => {
        setBody({ ...body, relations: [...body.relations, { ...defaultRelation }] });
    };

    const deleteRelation = (deleteIndex: number) => {
        const newRelations: IRelationElement[] = [];
        body.relations.forEach((item, index) => {
            if (index !== deleteIndex) {
                newRelations.push({ ...item });
            }
        });
        setBody({ ...body, relations: newRelations });
    };

    const onChangeRelation = (relationIndex: number, field: string, value: string | null) => {
        const newRelations = body.relations.map((item, index) => {
            if (relationIndex === index) {
                return { ...item, [field]: value };
            }
            return { ...item };
        });
        setBody({ ...body, relations: [...newRelations] });
    };

    const getRelations = () => {
        return body.relations.map((item, index) => {
            let table1FieldsOptions: { label: string; value: string }[] = [];
            let table2FieldsOptions: { label: string; value: string }[] = [];

            tableList.forEach((table) => {
                if (table.name === item.table1) {
                    table.columns.forEach((column) =>
                        table1FieldsOptions.push({
                            label: column.title,
                            value: column.name,
                        }),
                    );
                }
                if (table.name === item.table2) {
                    table.columns.forEach((column) =>
                        table2FieldsOptions.push({
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
                            value={tableOptions.find((found) => found.value === item.table1) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                value && onChangeRelation(index, 'table1', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={joinTypeOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={joinTypeOptions.find((found) => found.value === item.joinType) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeRelation(index, 'joinType', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => found.value === item.table2) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeRelation(index, 'table2', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={table1FieldsOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={table1FieldsOptions.find((found) => found.value === item.table1Field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeRelation(index, 'table1Field', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={comparsionTypeOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={comparsionTypeOptions.find((found) => found.value === item.comparsionType) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeRelation(index, 'comparsionType', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={table2FieldsOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={table2FieldsOptions.find((found) => found.value === item.table2Field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeRelation(index, 'table2Field', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                        <IconButton
                            size="small"
                            onClick={() => {
                                deleteRelation(index);
                            }}
                        >
                            <ClearIcon sx={{ color: '#aa0000' }} />
                        </IconButton>
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
                                    <TableCell sx={{ width: '20%' }}>Таблица 1</TableCell>
                                    <TableCell sx={{ width: '10%' }}>Тип связи</TableCell>
                                    <TableCell sx={{ width: '20%' }}>Таблица 2</TableCell>
                                    <TableCell sx={{ width: '20%' }}>Поле таблицы 1</TableCell>
                                    <TableCell sx={{ width: '10%' }}>Условие связи</TableCell>
                                    <TableCell sx={{ width: '20%' }}>Поле таблицы 2</TableCell>
                                    <TableCell sx={{ width: '5%' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getRelations()}
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell sx={{ width: '5%', textAlign: 'right' }}>
                                        <Tooltip title="Добавить строку">
                                            <IconButton size="small" onClick={addRelation}>
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

export default Relations;
