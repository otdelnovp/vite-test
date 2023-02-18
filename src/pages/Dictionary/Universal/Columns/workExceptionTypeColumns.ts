import { colorCustomBodyRender } from '@helpers/dataTableHelper';

export interface IWorkExceptionTypeColumnElement {
    Id: string;
    CompanyId: string;
    Name: string;
    Code: string;
    ColorCode: number;
    IsDeleted: boolean;
}

export const workExceptionTypeColumns = [
    {
        name: 'Id',
        label: 'ИД исключения',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'CompanyId',
        label: 'Организация',
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
        name: 'Code',
        label: 'Код',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'ColorCode',
        label: 'Цвет',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: colorCustomBodyRender,
        },
    },
    {
        name: 'CompanyName',
        label: 'Компания',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];