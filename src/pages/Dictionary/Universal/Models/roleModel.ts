import { IFormField } from '@core/UniversalForm/models';

export interface IRoleElement {
    id: string;
    title: string;
    description: string;
}

export const roleModel: IFormField[] = [
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
];
