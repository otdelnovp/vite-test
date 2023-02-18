import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IGroupColumnElement {
    group_id: string;
    group_name: string;
}

export const groupColumns = [
    {
        name: 'group_id',
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
        name: 'group_name',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
