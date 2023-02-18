import { IFormField } from '@core/UniversalForm/models';

export interface IWorkspaceElement {
    Id: string;
    CompanyId: string;
    Name: string;
    IsDeleted: boolean;
}

export const workspaceModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД рабочего пространства',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'CompanyId',
        label: 'Организация',
        input: 'autocomplete',
        config: {
            required: true,
            gridSize: 12,
            placeholder: 'Выберите организацию',
            fieldText: 'CompanyName',
            dictionaryName: 'companies',
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
