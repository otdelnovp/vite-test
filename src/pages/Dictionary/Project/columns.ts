import { stringToDateTimeStringFormat } from '@helpers/dateHelper';
import { projectStates } from '@helpers/dictionariesHelper';
import { booleanCustomBodyRender, booleanFilterOptions } from '@helpers/dataTableHelper';

export interface IProjectColumnElement {
    Id: string;
    CompanyId: string;
    Name: string;
    StartDate: string;
    EndDate: string;
    IsDeleted: boolean;
    CreateUserName: string;
    ModifyUserName: string;
    ObserverUserName: string;
    Description: string;
    IsArchive: boolean;
    State: string;
}

export const projectColumns = [
    {
        name: 'Id',
        label: 'ИД проекта',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
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
        name: 'CompanyName',
        label: 'Организация',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'StartDate',
        label: 'Дата начала',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'EndDate',
        label: 'Дата окончания',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'CreateUserName',
        label: 'Создал',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'State',
        label: 'Состояние',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                const currentItem = projectStates.find((item) => item.Code === value);
                return currentItem ? currentItem.Name : '';
            },
        },
    },
];

