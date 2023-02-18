import { IFormField } from '@core/UniversalForm/models';

export interface ITaskStateElement {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}

export const taskStateModel: IFormField[] = [
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
        name: 'Name',
        label: 'Наименование',
        config: {
            required: true,
            gridSize: 12,
        },
    },
];
