import React from 'react';

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

import { ICustomReportElement, ITableElement } from '../model';
import { sx } from '../styles';
import { addTableField, deleteTableField } from './methods';

interface ITablesAndFieldsProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const TablesAndFields = ({ body, setBody, tableList }: ITablesAndFieldsProps) => {
    const getAllTables = () => {
        return tableList.map((table) => {
            return (
                <TableRow>
                    <TableCell sx={sx.checkColumn}>
                        <Checkbox
                            size={'small'}
                            checked={body.tables && body.tables.find((tableName) => tableName === table.name) ? true : false}
                            onChange={(e) => {
                                if (body.tables) {
                                    if (e.target.checked) {
                                        setBody({ ...body, tables: [...body.tables, table.name] });
                                    } else {
                                        setBody({ ...body, tables: body.tables.filter((tableName) => tableName !== table.name) });
                                    }
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>{table.title}</TableCell>
                </TableRow>
            );
        });
    };

    const getAllTablesFields = () => {
        let fields: { table: string; field: string; title: string }[] = [];
        tableList.forEach((table) => {
            if (body.tables && body.tables.find((tableName) => tableName === table.name)) {
                table.columns.forEach((column) => {
                    fields.push({
                        table: table.name,
                        field: column.name,
                        title: table.title + '.' + column.title,
                    });
                });
            }
        });
        return fields.map((tableField) => {
            return (
                <TableRow>
                    <TableCell sx={sx.checkColumn}>
                        <Checkbox
                            size={'small'}
                            checked={
                                body.tableFields.findIndex(
                                    (findField) => findField.table === tableField.table && findField.field === tableField.field,
                                ) !== -1
                            }
                            onChange={(e) => {
                                if (e.target.checked) {
                                    addTableField(tableField, body, setBody);
                                } else {
                                    deleteTableField(tableField, body, setBody);
                                }
                            }}
                        />
                    </TableCell>
                    <TableCell>{tableField.title}</TableCell>
                </TableRow>
            );
        });
    };

    const getSelectedTablesFields = () => {
        return (
            body.tableFields &&
            body.tableFields.map((field) => {
                const currentTable = tableList.find((found) => found.name === field.table);
                const tableName = currentTable?.title;
                const fieldName = currentTable?.columns.find((found) => found.name === field.field)?.title;
                return (
                    <TableRow sx={sx.noCheckBoxRow}>
                        <TableCell sx={sx.checkColumn}>
                            <IconButton size="small" onClick={() => deleteTableField(field, body, setBody)}>
                                <ClearIcon sx={{ color: '#aa0000' }} />
                            </IconButton>
                        </TableCell>
                        <TableCell>{`${tableName}.${fieldName}`}</TableCell>
                    </TableRow>
                );
            })
        );
    };

    return (
        <React.Fragment>
            <Paper sx={sx.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Typography sx={sx.columnTitle}>1. Выберите таблицы для отчета:</Typography>
                        <Paper variant="outlined" sx={sx.column}>
                            <Table sx={sx.tablesAndFields}>{getAllTables()}</Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={sx.columnTitle}>2. Выберите поля таблиц для отчета:</Typography>
                        <Paper variant="outlined" sx={sx.column}>
                            <Table sx={sx.tablesAndFields}>{getAllTablesFields()}</Table>
                        </Paper>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography sx={sx.columnTitle}>3. Поля отчета:</Typography>
                        <Paper variant="outlined" sx={sx.column}>
                            <Table sx={sx.tablesAndFields}>{getSelectedTablesFields()}</Table>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </React.Fragment>
    );
};

export default TablesAndFields;
