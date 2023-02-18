import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { ICustomReportElement, ITableElement } from '../model';
import { moveTableRowDown, moveTableRowUp } from '../methods';
import { onChangeColumnSettings, onChangeReportType, reportTypeOptions } from './methods';
import { sx } from '../styles';

import HistogramSettings from './HistogramSettings';

interface IColumnSettingsProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const ColumnSettings = ({ body, setBody, tableList }: IColumnSettingsProps) => {
    const getColumnSettings = () => {
        return body.tableFields.map((item, index) => {
            const currentTable = tableList.find((found) => found.name === item.table);
            const tableName = currentTable?.title;
            const fieldName = currentTable?.columns.find((found) => found.name === item.field)?.title;

            return (
                <TableRow>
                    <TableCell>
                        <Typography>{`${tableName}.${fieldName}`}</Typography>
                    </TableCell>
                    <TableCell>
                        <TextField
                            sx={{ width: '100%' }}
                            variant="filled"
                            value={item.title}
                            onChange={(e: any) => onChangeColumnSettings(index, 'title', e.target.value, body, setBody)}
                        />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                        <Tooltip title="Вверх">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    moveTableRowUp(body, setBody, 'tableFields', index);
                                }}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Вниз">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    moveTableRowDown(body, setBody, 'tableFields', index);
                                }}
                            >
                                <ArrowDownwardIcon />
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
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ marginBottom: '16px' }}>
                            <Autocomplete
                                options={reportTypeOptions}
                                renderInput={(params) => <TextField {...params} variant="filled" />}
                                value={reportTypeOptions.find((found) => found.value === body.reportType) || null}
                                onChange={(e: any, value: { label: string; value: string } | null) => {
                                    onChangeReportType(value ? value.value : null, body, setBody);
                                }}
                            />
                        </Grid>
                        {body.reportType === 'table' && (
                            <Grid item xs={12}>
                                <Table sx={sx.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ width: '15%' }}>Таблица.Поле</TableCell>
                                            <TableCell sx={{ width: '75%' }}>Наименование колонки</TableCell>
                                            <TableCell sx={{ width: '5%' }}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getColumnSettings()}
                                        <TableRow></TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        )}
                        {body.reportType === 'histogram' && (
                            <Grid item xs={12}>
                                <HistogramSettings body={body} setBody={setBody} tableList={tableList} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Paper>
        </React.Fragment>
    );
};

export default ColumnSettings;
