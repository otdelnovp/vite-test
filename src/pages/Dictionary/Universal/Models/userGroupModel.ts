import { IFormField } from '@core/UniversalForm/models';

export interface IUserGroupElement {
    id: string;
    group_name: string;
    description: string;
    org_id: string;
}

export const userGroupModel: IFormField[] = [
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
        name: 'group_name',
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
        name: 'org_id',
        label: 'Организация',
        input: 'autocomplete',
        config: {
            required: true,
            gridSize: 12,
            placeholder: 'Выберите организацию',
            fieldText: 'org_title',
            dictionaryName: 'companies',
        },
    },
];
