import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface ICompanyColumnElement {
    Id: string;
    Name: string;
    Address: string;
}

export const companyColumns = [
    {
        name: 'Id',
        label: 'ИД организации',
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
            sortDefault: 'asc',
        },
    },
    {
        name: 'INN',
        label: 'ИНН',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'KPP',
        label: 'КПП',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'Address',
        label: 'Адрес фактический',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
