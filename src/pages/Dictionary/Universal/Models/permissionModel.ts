import { IFormField } from '@core/UniversalForm/models';

export interface IPermissionElement {
    id: string;
    title: string;
    description: string;
    descriptor: string;
}

export const permissionModel: IFormField[] = [
    {
        name: 'id',
        label: 'Идентификатор',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'title',
        label: 'Наименование',
        config: {
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'description',
        label: 'Описание',
        config: {
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'descriptor',
        label: 'Дескриптор',
        config: {
            required: true,
            gridSize: 12,
        },
    },
];
