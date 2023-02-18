import { getHoursMaskByMinutes, getWeekNumber, stringToDateTimeStringFormat } from '@helpers/dateHelper';
import { getMonday } from './WeeklyReportTable/methods';

export interface IWeeklyReportColumnElement {
    Id: string;
    WorkerId: string;
    WorkerName: string;
    Date: string;
    State: string;
    StateName: string;
    SummaryTime: number;
}

export const weeklyReportColumns = [
    {
        name: 'Id',
        label: 'Идентификатор',
        options: {
            viewColumns: false,
            display: false,
        },
    },
    {
        name: 'Date',
        label: 'Дата',
        options: {
            customBodyRender: (value: string) => {
                return stringToDateTimeStringFormat(value, 'DD.MM.YYYY');
            },
        },
    },
    {
        name: 'Date',
        label: 'Номер недели',
        options: {
            customBodyRender: (value: string) => {
                const mondayDate = new Date(getMonday(value));
                return getWeekNumber(mondayDate)[1];
            },
        },
    },
    {
        name: 'WorkerName',
        label: 'Работник',
        options: {},
    },
    {
        name: 'StateName',
        label: 'Состояние',
        options: {},
    },
    {
        name: 'SummaryTime',
        label: 'Время',
        options: {
            customBodyRender: (value: string) => {
                return getHoursMaskByMinutes(value ? parseInt(value) : 0);
            },
        },
    },
];
