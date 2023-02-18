import { IFormField } from '@core/UniversalForm/models';

export interface IWorkExceptionTypeElement {
    Id: string;
    CompanyId: string;
    Name: string;
    Code: string;
    ColorCode: number;
    IsDeleted: boolean;
}

export const workExceptionTypeModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД исключения',
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
    {
        name: 'Code',
        label: 'Код',
        input: 'universal',
        config: {
            type: 'string',
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'ColorCode',
        label: 'Цвет',
        input: 'universal',
        config: {
            type: 'color',
            required: true,
            gridSize: 12,
        },
    },
];

