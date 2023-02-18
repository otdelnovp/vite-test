import { IFormField } from '@core/UniversalForm/models';
import { projectStates } from '@helpers/dictionariesHelper';

export interface IProjectElement {
    Id: string;
    CompanyId: string;
    Name: string;
    StartDate: string;
    EndDate: string;
    IsDeleted: boolean;
    Participants: {
        UserId: string;
        UserName: string;
    }[];
    BoardStates: {
        BoardStateId: string;
        BoardStateName: string;
        N: number;
    }[];
}

export const projectModel: IFormField[] = [
    {
        name: 'Id',
        label: 'ИД проекта',
        config: {
            hidden: true,
        },
    },
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
        name: 'Code',
        label: 'Код',
        config: {
            required: true,
            gridSize: 2,
        },
    },
    {
        name: 'Name',
        label: 'Наименование',
        config: {
            required: true,
            gridSize: 6,
        },
    },
    {
        name: 'CreateUserId',
        label: 'Создал',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'CreateUserName',
            dictionaryName: 'companyUsers',
            filterFields: ['CompanyId'],
            selectProps: {
                valueField: 'id',
                textField: 'full_name',
            },
        },
    },
    {
        name: 'CreateDate',
        label: 'Дата создания',
        input: 'datetime-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 2,
        },
    },
    {
        name: 'ModifyUserId',
        label: 'Изменил',
        input: 'autocomplete',
        config: {
            type: 'guid',
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'ModifyUserName',
            dictionaryName: 'companyUsers',
            filterFields: ['CompanyId'],
            selectProps: {
                valueField: 'id',
                textField: 'full_name',
            },
        },
    },
    {
        name: 'ModifyDate',
        label: 'Дата изменения',
        input: 'datetime-picker',
        config: {
            type: 'date',
            gridSize: 2,
        },
    },
    {
        name: 'StartDate',
        label: 'Дата начала',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 2,
        },
    },
    {
        name: 'EndDate',
        label: 'Дата окончания',
        input: 'date-picker',
        config: {
            type: 'date',
            required: true,
            gridSize: 2,
        },
    },
    {
        name: 'State',
        label: 'Состояние',
        input: 'select',
        config: {
            required: true,
            gridSize: 2,
            options: projectStates.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
        },
    },
    {
        name: 'ObserverUserId',
        label: 'Наблюдатель',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 4,
            placeholder: 'Выберите пользователя',
            fieldText: 'ObserverUserName',
            dictionaryName: 'companyUsers',
            parentId: 'CompanyId',
            filterFields: ['CompanyId'],
            selectProps: {
                valueField: 'id',
                textField: 'full_name',
            },
        },
    },
    {
        name: 'Description',
        label: 'Описание',
        config: {
            required: true,
            gridSize: 10,
        },
    },
];

