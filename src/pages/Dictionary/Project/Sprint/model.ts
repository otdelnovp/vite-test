import { IFormField } from '@core/UniversalForm/models';

export interface ISprintElement {
    Id: string;
    ProjectId: string;
    Name: string;
    IsDeleted: boolean;
}

export const sprintModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'ProjectId',
        label: 'Проект',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        config: {
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'DateFrom',
        label: 'Дата начала',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 6,
        },
    },
    {
        name: 'DateTo',
        label: 'Дата окончания',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 6,
        },
    },
];
