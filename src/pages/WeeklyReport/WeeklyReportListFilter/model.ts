import { IFormField } from '@core/UniversalForm/models';
import { projectStates } from '@helpers/dictionariesHelper';

export interface IWeeklyReportListFilter {
    CompanyId: string | null;
    CompanyName: string;
    DepartmentId: string | null;
    DepartmentName: string;
    WorkerId: string | null;
    WorkerName: string;
    DateFrom: string | null;
    DateTo: string | null;
}

export const weeklyReportListFilterInit: IWeeklyReportListFilter = {
    CompanyId: null,
    CompanyName: '',
    DepartmentId: null,
    DepartmentName: '',
    WorkerId: null,
    WorkerName: '',
    DateFrom: null,
    DateTo: null,
};

export const weeklyReportListFilterModel: IFormField[] = [
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
        name: 'DepartmentId',
        label: 'Подразделение',
        input: 'autocomplete',
        config: {
            type: 'guid',
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'DepartmentName',
            dictionaryName: 'departments',
            filterFields: ['CompanyId'],
            selectProps: {
                valueField: 'Id',
                textField: 'Name',
            },
        },
    },
    {
        name: 'WorkerId',
        label: 'Работник',
        input: 'autocomplete',
        config: {
            type: 'guid',
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'WorkerName',
            dictionaryName: 'companyUsers',
            filterFields: ['CompanyId', 'DepartmentId'],
            selectProps: {
                valueField: 'id',
                textField: 'full_name',
            },
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
];
