import { stringToDateTimeStringFormat } from "@helpers/dateHelper";

export interface IStateHistoryColumnElement {
    Id: string;
    Date: string;
    UserId: string;
    UserName: string;
    State: string;
    StateName: string;
    Comment: string;
}

export const stateHistoryColumns = [
    {
        name: 'Id',
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
        name: 'Date',
        label: 'Дата',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value)
            },
            sortDefault: 'desc',
        },
    },
    {
        name: 'UserName',
        label: 'Пользователь',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'StateName',
        label: 'Состояние',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'Comment',
        label: 'Комментарий',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];

