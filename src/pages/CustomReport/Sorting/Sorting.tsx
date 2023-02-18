import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import ClearIcon from '@mui/icons-material/Clear';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import { ICustomReportElement, ISortElement, ITableElement } from '../model';
import { getOptionsTablesSelected, moveTableRowDown, moveTableRowUp } from '../methods';
import { customReport_TableList } from '../testData/testData_CustomReport';
import { sx } from '../styles';

const defaultSort: ISortElement = {
    table: '',
    field: '',
    sortType: 'asc',
    order: 0,
};

const sortTypeOptions = [
    { value: 'asc', label: 'По возрастанию' },
    { value: 'desc', label: 'По убыванию' },
];

interface ISortingProps {
    body: ICustomReportElement;
    setBody: (newBody: ICustomReportElement) => void;
    tableList: ITableElement[];
}

const Sorting = ({ body, setBody, tableList }: ISortingProps) => {
    const tableOptions = getOptionsTablesSelected(body, tableList);

    const addSort = () => {
        setBody({ ...body, sort: [...body.sort, { ...defaultSort, order: body.sort.length + 1 }] });
    };

    const deleteSort = (deleteIndex: number) => {
        let newSort: ISortElement[] = [];
        body.sort.forEach((item, index) => {
            if (index !== deleteIndex) {
                newSort.push({ ...item });
            }
        });
        newSort = newSort.map((item, index) => {
            return { ...item, order: index + 1 };
        });
        setBody({ ...body, sort: newSort });
    };

    const onChangeSort = (relationIndex: number, field: string, value: string | null) => {
        const newSort = body.sort.map((item, index) => {
            if (relationIndex === index) {
                return { ...item, [field]: value };
            }
            return { ...item };
        });
        setBody({ ...body, sort: [...newSort] });
    };

    const getSort = () => {
        return body.sort.map((item, index) => {
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
                    {/* <TableCell>{`${item.order}.`}</TableCell> */}
                    <TableCell>
                        <Autocomplete
                            options={tableOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableOptions.find((found) => found.value === item.table) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                value && onChangeSort(index, 'table', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={tableFieldsOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={tableFieldsOptions.find((found) => found.value === item.field) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeSort(index, 'field', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell>
                        <Autocomplete
                            options={sortTypeOptions}
                            renderInput={(params) => <TextField {...params} variant="filled" />}
                            value={sortTypeOptions.find((found) => found.value === item.sortType) || null}
                            onChange={(e: any, value: { label: string; value: string } | null) =>
                                onChangeSort(index, 'sortType', value ? value.value : null)
                            }
                        />
                    </TableCell>
                    <TableCell sx={{ textAlign: 'right' }}>
                        <Tooltip title="Вверх">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    moveTableRowUp(body, setBody, 'sort', index);
                                }}
                            >
                                <ArrowUpwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Вниз">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    moveTableRowDown(body, setBody, 'sort', index);
                                }}
                            >
                                <ArrowDownwardIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Удалить строку">
                            <IconButton
                                size="small"
                                onClick={() => {
                                    deleteSort(index);
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
                                    <TableCell sx={{ width: '30%' }}>Таблица</TableCell>
                                    <TableCell sx={{ width: '30%' }}>Поле</TableCell>
                                    <TableCell sx={{ width: '25%' }}>Порядок сортировки</TableCell>
                                    <TableCell sx={{ width: '10%' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {getSort()}
                                <TableRow>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell sx={{ width: '5%', textAlign: 'right' }}>
                                        <Tooltip title="Добавить строку">
                                            <IconButton size="small" onClick={addSort}>
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

export default Sorting;
