import { boardStateSort } from '@helpers/dictionariesHelper';
import { checkBooleanCustomBodyRender } from '@helpers/dataTableHelper';

export interface IBoardStateColumnElement {
    Id: string;
    CompanyId: string;
    Name: string;
    SortBy: 'StartDatePlan' | 'StartDateFact' | 'EndDateFact' | null;
    IsDeleted: boolean;
}

export const boardStateColumns = [
    {
        name: 'Id',
        label: 'ИД состояния доски',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },

    {
        name: 'SortBy',
        label: 'Сортировка (канбан)',
        options: {
            customBodyRender: (value: any) => {
                const found = boardStateSort.find((item) => item.Code === value);
                if (found) {
                    return found.Name;
                } else {
                    return '';
                }
            },
        },
    },
    {
        name: 'IsLate',
        label: 'С опозданием',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: checkBooleanCustomBodyRender,
            filterOptions: {
                names: ['Да', 'Нет'],
                logic: (value: boolean, filterVal: string) => {
                    return (!value && filterVal == 'Да') || (value && filterVal == 'Нет');
                },
            },
        },
    },
    {
        name: 'IsActive',
        label: 'Активный',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
            customBodyRender: checkBooleanCustomBodyRender,
            filterOptions: {
                names: ['Да', 'Нет'],
                logic: (value: boolean, filterVal: string) => {
                    return (!value && filterVal == 'Да') || (value && filterVal == 'Нет');
                },
            },
        },
    },
    {
        name: 'CompanyName',
        label: 'Организация',
        options: {
            filter: true,
            searchable: true,
            viewColumns: true,
            sortThirdClickReset: true,
        },
    },
];
