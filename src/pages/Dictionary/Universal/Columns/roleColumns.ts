import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IRoleColumnElement {
    id: string;
    title: string;
    description: string;
}

export const roleColumns = [
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
];
