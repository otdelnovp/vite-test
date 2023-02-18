import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IPermissionColumnElement {
    id: string;
    title: string;
    description: string;
    descriptor: string;
}

export const permissionColumns = [
    {
        name: 'id',
        label: 'Идентификатор',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'title',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            sortDefault: 'asc',
        },
    },
    {
        name: 'description',
        label: 'Описание',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'descriptor',
        label: 'Дескриптор',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
