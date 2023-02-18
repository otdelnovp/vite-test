import { IFormField } from '@core/UniversalForm/models';

export interface ITaskTypeElement {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}

export const taskTypeModel: IFormField[] = [
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
