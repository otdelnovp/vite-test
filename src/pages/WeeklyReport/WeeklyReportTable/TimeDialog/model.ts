import { IFormField } from '@core/UniversalForm/models';

export interface ITimeDialog {
    Id: string | null;
    TaskId: string;
    UserId: string;
    Comment: string;
    Time: number;
    Date: string;
}

export const initTimeDialog = {
    Id: '',
    TaskId: '',
    UserId: '',
    Comment: '',
    Time: 0,
    Date: '',
};

export const timeDialogModel: IFormField[] = [
    {
        name: 'Id',
        label: 'Идентификатор',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    // {
    //     name: 'Date',
    //     label: 'Дата',
    //     input: 'datetime-picker',
    //     config: {
    //         type: 'date',
    //         required: true,
    //         gridSize: 12,
    //     },
    // },
    {
        name: 'Time',
        label: 'Время',
        input: 'universal',
        config: {
            type: 'hours',
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'Comment',
        label: 'Комментарий',
        config: {
            required: false,
            gridSize: 9,
        },
    },
];

