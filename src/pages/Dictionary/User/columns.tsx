import React from 'react';
import { checkBooleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IUserColumnElement {
    id: string;
    create_date: string;
    update_date: string;
    username: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
    position: string;
    note: string;
    sms_notification: boolean;
    email_notification: boolean;
    user_status: string;
    org_id: string;
    org_name: string;
}

export const userColumns = [
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
        name: 'username',
        label: 'Логин',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'last_name',
        label: 'ФИО',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) =>
                `${value} ${tableMeta.tableData[tableMeta.rowIndex][tableMeta.columnIndex + 1]} ${
                    tableMeta.tableData[tableMeta.rowIndex][tableMeta.columnIndex + 2]
                }`,
        },
    },
    {
        name: 'first_name',
        label: 'Имя',
        options: {
            filter: true,
            searchable: true,
            viewColumns: false,
            display: false,
        },
    },
    {
        name: 'middle_name',
        label: 'Отчество',
        options: {
            filter: true,
            searchable: true,
            viewColumns: false,
            display: false,
        },
    },
    {
        name: 'phone_number',
        label: 'Контакты',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => (
                <span>
                    {value}
                    <br />
                    {tableMeta.tableData[tableMeta.rowIndex][tableMeta.columnIndex + 1]}
                </span>
            ),
        },
    },
    {
        name: 'email',
        label: 'Email',
        options: {
            filter: true,
            searchable: true,
            viewColumns: false,
            display: false,
        },
    },
    {
        name: 'position',
        label: 'Должность',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
    {
        name: 'sms_notification',
        label: 'СМС',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: checkBooleanCustomBodyRender,
        },
    },
    {
        name: 'email_notification',
        label: 'Email',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: checkBooleanCustomBodyRender,
        },
    },
    {
        name: 'dept_id',
        label: 'Департамент',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'dept_name',
        label: 'Департамент',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];

