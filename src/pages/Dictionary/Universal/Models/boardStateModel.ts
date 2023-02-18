import { IFormField } from '@core/UniversalForm/models';
import { boardStateSort } from '@helpers/dictionariesHelper';

export interface IBoardStateElement {
    Id: string;
    CompanyId: string;
    Name: string;
    SortBy: 'StartDatePlan' | 'StartDateFact' | 'EndDateFact' | null;
    IsDeleted: boolean;
}

export const boardStateModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД состояния доски',
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
    {
        name: 'SortBy',
        label: 'Сортировка (канбан)',
        input: 'select',
        config: {
            gridSize: 12,
            options: boardStateSort.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
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
        name: 'IsLate',
        label: 'С опозданием',
        input: 'universal',
        config: {
            type: 'checkbox',
            required: false,
            gridSize: 4,
        },
    },
    {
        name: 'IsActive',
        label: 'Активный статус',
        input: 'universal',
        config: {
            type: 'checkbox',
            required: false,
            gridSize: 4,
        },
    },
];
