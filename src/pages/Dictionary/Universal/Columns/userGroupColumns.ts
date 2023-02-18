import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IUserGroupColumnElement {
    id: string;
    group_name: string;
    description: string;
    org_id: string;
}

export const userGroupColumns = [
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
        name: 'group_name',
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
        name: 'org_title',
        label: 'Организация',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
