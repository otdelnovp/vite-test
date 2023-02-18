import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IRoleColumnElement {
    role_id: string;
    role_title: string;
}

export const roleColumns = [
    {
        name: 'role_id',
        label: 'Идентификатор',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: false,
            display: false,
        },
    },
    {
        name: 'role_title',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
