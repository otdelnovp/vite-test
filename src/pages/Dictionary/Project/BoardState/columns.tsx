import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

export interface IProjectBoardStateColumnElement {
    BoardStateId: string;
    BoardStateName: string;
    N: number;
}

export const projectBoardStateColumns = [
    {
        name: 'BoardStateId',
        label: '',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: false,
            display: false,
        },
    },
    {
        name: 'BoardStateName',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'CompanyId',
        label: 'Общий для всех',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            display: true,
            customBodyRender: (value: any) => (!value ? <CheckIcon /> : null),
        },
    },
    {
        name: 'N',
        label: 'Порядок на доске',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            display: true,
        },
    },
];
