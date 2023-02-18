import React from 'react';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EditIcon from '@mui/icons-material/Edit';

import { ICustomReportElement, ITableElement } from './model';

export const getOptionsTablesSelected = (body: ICustomReportElement, tableList: ITableElement[]): { value: string; label: string }[] => {
    return [
        ...body.tables.map((tableName) => {
            const found = tableList.find((item) => item.name === tableName);
            return { value: found?.name || '', label: found?.title || '' };
        }),
    ];
};

export const moveTableRowUp = (body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void, tableName: string, index: number) => {
    if (index <= 0) return;
    //@ts-ignore
    const newTable = body[tableName].map((item, ind) => {
        if (ind === index) return { ...item, order: item.order - 1 };
        if (ind === index - 1) return { ...item, order: item.order + 1 };
        return { ...item };
    });
    newTable.sort((a: any, b: any) => a.order - b.order);
    setBody({ ...body, [tableName]: [...newTable] });
};

export const moveTableRowDown = (body: ICustomReportElement, setBody: (newBody: ICustomReportElement) => void, tableName: string, index: number) => {
    //@ts-ignore
    if (index >= body[tableName].length - 1) return;
    //@ts-ignore
    const newTable = body[tableName].map((item, ind) => {
        if (ind === index) return { ...item, order: item.order + 1 };
        if (ind === index + 1) return { ...item, order: item.order - 1 };
        return { ...item };
    });
    newTable.sort((a: any, b: any) => a.order - b.order);
    setBody({ ...body, [tableName]: [...newTable] });
};

export const getComparsionForQuery = (comparsionType: string) => {
    switch (comparsionType) {
        case 'equal':
            return '=';
        case 'not_equal':
            return '!=';
        case 'more':
            return '>';
        case 'less':
            return '<';
        case 'more_or_equal':
            return '>=';
        case 'less_or_equal':
            return '<=';
        default:
            return '';
    }
};

export const getJoinForQuery = (joinType: string) => {
    switch (joinType) {
        case 'left':
            return 'LEFT';
        case 'right':
            return 'RIGHT';
        case 'full':
            return 'FULL';
        case 'inner':
            return 'INNER';
        default:
            return '';
    }
};

export const getQueryText = (body: ICustomReportElement, tableList: ITableElement[]) => {
    let queryText = 'SELECT\n';
    body.tableFields.forEach((tableField) => {
        queryText = queryText + `\t${tableField.table}.${tableField.field} AS ${tableField.title},\n`;
    });

    // queryText = queryText + 'ИЗ\n';
    // body.tables.forEach((table) => {
    //     queryText = queryText + `\t${table},\n`;
    // });

    queryText = queryText + 'FROM\n';
    body.relations.forEach((relation) => {
        queryText =
            queryText +
            `\t${relation.table1} ${getJoinForQuery(relation.joinType)} JOIN ${relation.table2} ON ${relation.table1}.${
                relation.table1Field
            }${getComparsionForQuery(relation.comparsionType)}${relation.table2}.${relation.table2Field},\n`;
    });

    queryText = queryText + 'WHERE\n';
    body.conditions.forEach((condition) => {
        queryText = queryText + `\t${condition.table}.${condition.field}${getComparsionForQuery(condition.comparsionType)}&${condition.value}\n`;
    });

    queryText = queryText + 'ORDER BY\n';
    body.sort.forEach((sort) => {
        queryText = queryText + `\t${sort.table}.${sort.field}${sort.sortType === 'asc' ? ' ASC' : ' DESC'},\n`;
    });

    return queryText;
};

interface IGetCustomReportColumns {
    columns: any;
    showViewPage: (id?: string) => void;
    showEditPage: (id?: string) => void;
}

export const getCustomReportColumns = (args: IGetCustomReportColumns) => {
    const { columns, showViewPage, showEditPage } = args;
    return [
        ...columns,
        {
            name: 'id',
            label: ' ',
            options: {
                filter: false,
                searchable: false,
                sort: false,
                viewColumns: false,
                setCellProps: () => ({ style: { width: 50, padding: '8px 8px' } }),
                customBodyRender: (value: string) => {
                    return (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Tooltip title="Просмотр отчета">
                                <IconButton onClick={() => showViewPage(value)}>
                                    <PlayArrowIcon sx={{ color: '#144678' }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Редактирование отчета">
                                <IconButton onClick={() => showEditPage(value)}>
                                    <EditIcon sx={{ color: '#144678' }} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    );
                },
            },
        },
    ];
};
