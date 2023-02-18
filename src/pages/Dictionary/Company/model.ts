import { IContractColumnElement } from '@pages/Dictionary/Company/Contract/columns';
import { IDepartmentColumnElement } from '@pages/Dictionary/Company/Department/columns';
import { IFormField } from '@core/UniversalForm/models';

import { companyStatuses } from '@helpers/dictionariesHelper';

export interface ICompanyElement {
    Id: string;
    Name: string;
    LegalName: string;
    OwnershipTypeCode: string;
    INN: string;
    KPP: string;
    OGRN: string;
    EKK: string;
    Address: string;
    LegalAddress: string;
    Phone: string;
    Email: string;
    ContactPerson: string;
    Status: string;
    Supervisor: string;
    Contracts: IContractColumnElement[];
    Departments: IDepartmentColumnElement[];
    IsDeleted: boolean;
    CreateDate: string;
    ModifyDate: string;
}

export const companyModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД организации',
        config: {
            hidden: true,
            required: false,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        input: 'company-search',
        config: {
            required: true,
            gridSize: 4,
        },
    },
    {
        name: 'LegalName',
        label: 'Наименование по документам',
        config: {
            required: true,
            gridSize: 5,
        },
    },
    {
        name: 'OwnershipTypeCode',
        label: 'Организационно-правовая форма',
        input: 'autocomplete',
        config: {
            required: true,
            gridSize: 3,
            placeholder: 'Выберите организационно-правовую форму',
            fieldText: 'OwnershipTypeName',
            dictionaryName: 'companyOwnershipTypes',
            selectProps: {
                valueField: 'Code',
                textField: 'Name',
            },
        },
    },
    {
        name: 'INN',
        label: 'ИНН',
        input: 'company-search',
        config: {
            type: 'inn',
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'KPP',
        label: 'КПП',
        input: 'masked',
        config: {
            type: 'kpp',
            gridSize: 3,
        },
    },
    {
        name: 'OGRN',
        label: 'ОГРН',
        input: 'masked',
        config: {
            type: 'ogrn',
            gridSize: 3,
        },
    },
    {
        name: 'EKK',
        label: 'ЕКК',
        input: 'masked',
        config: {
            type: 'ekk',
            gridSize: 3,
        },
    },
    {
        name: 'Address',
        label: 'Адрес фактический',
        input: 'address-search',
        config: {
            gridSize: 6,
        },
    },
    {
        name: 'LegalAddress',
        label: 'Адрес юридический',
        input: 'address-search',
        config: {
            gridSize: 6,
        },
    },
    {
        name: 'Phone',
        label: 'Телефон',
        input: 'masked',
        config: {
            type: 'phone',
            gridSize: 3,
        },
    },
    {
        name: 'Email',
        label: 'Email',
        input: 'email',
        config: {
            gridSize: 3,
        },
    },
    {
        name: 'ContactPerson',
        label: 'Контактное лицо',
        config: {
            gridSize: 3,
        },
    },
    {
        name: 'Supervisor',
        label: 'Супервизор',
        config: {
            gridSize: 3,
        },
    },
    {
        name: 'Status',
        label: 'Статус',
        input: 'select',
        config: {
            gridSize: 2,
            options: companyStatuses.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
        },
    },
];

