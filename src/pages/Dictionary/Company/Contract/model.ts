import { IFormField } from '@core/UniversalForm/models';

export interface IContractElement {
    Id: string;
    SupplierId: string;
    SupplierName: string;
    CustomerId: string;
    CustomerName: string;
    Number: string;
    DateOfIssue: string;
    ValidFrom: string;
    ValidTo: string;
    Description: string;
    IsDeleted: boolean;
}

export const contractModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД договора',
        config: {
            hidden: true,
        },
    },
    {
        name: 'Number',
        label: 'Номер договора',
        config: {
            required: true,
            gridSize: 6,
        },
    },
    {
        name: 'DateOfIssue',
        label: 'Дата договора',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 6,
        },
    },
    {
        name: 'SupplierId',
        label: 'Поставщик',
        input: 'autocomplete',
        config: {
            required: true,
            gridSize: 12,
            placeholder: 'Выберите поставщика',
            fieldText: 'SupplierName',
            dictionaryName: 'companies',
        },
    },
    {
        name: 'CustomerId',
        label: 'Покупатель',
        input: 'autocomplete',
        config: {
            required: true,
            gridSize: 12,
            placeholder: 'Выберите покупателя',
            fieldText: 'CustomerName',
            dictionaryName: 'companies',
        },
    },
    // {
    //     name: 'ValidFrom',
    //     label: 'Действует с',
    //     input: 'date-picker',
    //     config: {
    //         type: 'date',
    //         required: true,
    //         gridSize: 6,
    //         maxDate: 'ValidTo',
    //     },
    // },
    // {
    //     name: 'ValidTo',
    //     label: 'Действует до',
    //     input: 'date-picker',
    //     config: {
    //         type: 'date',
    //         required: true,
    //         gridSize: 6,
    //         minDate: 'ValidFrom',
    //     },
    // },
    {
        name: 'ValidFrom_ValidTo',
        label: 'Период действия',
        input: 'date-range-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 12,
            dates: ['ValidFrom', 'ValidTo'],
        },
    },
    {
        name: 'Description',
        label: 'Описание',
        config: {
            gridSize: 12,
        },
    },
];
