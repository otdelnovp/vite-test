import { booleanCustomBodyRender, booleanFilterOptions } from '@helpers/dataTableHelper';

export interface ITaskStateColumnElement {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}

export const taskStateColumns = [
    {
        name: 'Id',
        label: 'ИД',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'IsDeleted',
        label: 'Удален',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: booleanCustomBodyRender,
            filterOptions: booleanFilterOptions,
        },
    },
];
