import { IFormField } from '@core/UniversalForm/models';
import { IStateHistoryElement } from './StateHistory/model';
import { IExecutionTimeElement, IWorkExceptionTimeElement } from './WeeklyReportTable/methods';

export interface IWeeklyReportElement {
    Id: string;
    org_id: string;
    WorkerId: string;
    WorkerName: string;
    Date: string;
    State: string;
    StateName: string;
    ExecutionTimes: IExecutionTimeElement[];
    WorkExceptionTimes: IWorkExceptionTimeElement[];
    StateHistory: IStateHistoryElement[];
}

export const weeklyReportModel: IFormField[] = [
    {
        name: 'Id',
        label: 'Идентификатор',
        config: {
            hidden: true,
            required: true,
            gridSize: 12,
        },
    },
    {
        name: 'WorkerId',
        label: 'Работник',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'WorkerName',
            dictionaryName: 'companyUsers',
            filterFields: ['org_id'],
            selectProps: {
                valueField: 'id',
                textField: 'full_name',
            },
        },
    },
    {
        name: 'Date',
        label: 'Дата отчета (понедельник)',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 2,
        },
    },
];

