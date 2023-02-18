import { IFormField } from '@core/UniversalForm/models';

export interface IDepartmentElement {
    Id: string;
    ParentId: string;
    Name: string;
    Address: string;
    LegalAddress: string;
    Phone: string;
    Email: string;
    ContactPerson: string;
    IsDeleted: boolean;
    CreateDate: string;
    ModifyDate: string;
}

export const departmentModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД подразделения',
        config: {
            hidden: true,
        },
    },
    {
        name: 'ParentId',
        label: 'Родитель',
        input: 'autocomplete',
        config: {
            gridSize: 12,
            placeholder: 'Выберите подразделение верхнего уровня',
            dictionaryName: 'departments',
            skipCurrentId: true,
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
        name: 'Address',
        label: 'Адрес',
        config: {
            gridSize: 12,
        },
    },
    {
        name: 'Phone',
        label: 'Телефон',
        input: 'masked',
        config: {
            type: 'phone',
            gridSize: 12,
        },
    },
    {
        name: 'Email',
        label: 'Email',
        input: 'email',
        config: {
            gridSize: 12,
        },
    },
    {
        name: 'ContactPerson',
        label: 'Контактное лицо',
        config: {
            gridSize: 12,
        },
    },
];

