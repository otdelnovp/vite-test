import { IFormField } from '@core/UniversalForm/models';
import { projectStates } from '@helpers/dictionariesHelper';

export interface IProjectListFilter {
    CompanyId: string;
    CompanyName: string;
    CreateUserId: string | null;
    CreateUserName: string;
    DateFrom: string | null;
    DateTo: string | null;
    ObserverUserId: string | null;
    ObserverUserName: string;
    State: "M" | "O" | "C" | "A" | "H" | null;
}

export const projectListFilterInit: IProjectListFilter = {
    CompanyId: "",
    CompanyName: "",
    CreateUserId: null,
    CreateUserName: "",
    DateFrom: null,
    DateTo: null,
    ObserverUserId: null,
    ObserverUserName: "",
    State: null,
};

export const projectListFilterModel: IFormField[] = [
    {
        name: 'CompanyId',
        label: 'Организация',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 4,
            placeholder: 'Выберите организацию',
            fieldText: 'CompanyName',
            dictionaryName: 'companies',
        },
    },
    {
        name: 'CreateUserId',
        label: 'Создал',
        input: 'autocomplete',
        config: {
            type: 'guid',
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'CreateUserName',
            dictionaryName: 'companyUsers',
            filterFields: ["CompanyId"],
            selectProps: {
                valueField: "id",
                textField: "full_name"
            }
        },
    },
    {
        name: 'ObserverUserId',
        label: 'Наблюдатель',
        input: 'autocomplete',
        config: {
            type: 'guid',
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'ObserverUserName',
            dictionaryName: 'companyUsers',
            filterFields: ["CompanyId"],
            selectProps: {
                valueField: "id",
                textField: "full_name"
            }
        },
    },
    {
        name: 'DateFrom_DateTo',
        label: 'Период действия',
        input: 'date-range-picker',
        config: {
            type: 'date',
            gridSize: 4,
            dates: ['DateFrom', 'DateTo'],
        },
    },
    {
        name: 'State',
        label: 'Состояние',
        input: 'select',
        config: {
            gridSize: 4,
            options: projectStates.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
        },
    },
];