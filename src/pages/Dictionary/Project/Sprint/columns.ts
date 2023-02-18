import { stringToDateTimeStringFormat } from '@helpers/dateHelper';
import { booleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface ISprintColumnElement {
    Id: string;
    ProjectId: string;
    CompanyId: string;
    Name: string;
    IsDeleted: boolean;
}

export const sprintColumns = [
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
        name: 'ProjectId',
        label: 'Проект',
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
        name: 'DateFrom',
        label: 'Дата начала',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY')
            }

        },
    },
    {
        name: 'DateTo',
        label: 'Дата окончания',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY')
            }

        },
    },
];
