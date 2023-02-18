import { IFormField } from '@core/UniversalForm/models';
import { userStatuses } from '@helpers/dictionariesHelper';

export interface IUserElement {
    id: string;
    // create_date: string;
    // update_date: string;
    username: string;
    last_name: string;
    first_name: string;
    middle_name: string;
    email: string;
    phone_number: string;
    position: string;
    note: string;
    sms_notification: boolean;
    email_notification: boolean;
    user_status: 'N' | 'A';
    org_id: string;
    org_name: string;
    dept_id: string;
    user_groups: {
        group_id: string;
        group_name: string;
    }[];
    user_roles: {
        role_id: string;
        role_title: string;
    }[];
}

export const userModel: IFormField[] = [
    {
        name: 'id',
        label: 'Идентификатор',
        config: {
            hidden: true,
        },
    },
    {
        name: 'last_name',
        label: 'Фамилия',
        config: {
            required: true,
            gridSize: 4,
        },
    },
    {
        name: 'first_name',
        label: 'Имя',
        config: {
            required: true,
            gridSize: 4,
        },
    },
    {
        name: 'middle_name',
        label: 'Отчество',
        config: {
            required: true,
            gridSize: 4,
        },
    },
    {
        name: 'username',
        label: 'Логин',
        config: {
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'email',
        label: 'Email',
        input: 'email',
        config: {
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'phone_number',
        label: 'Телефон',
        input: 'masked',
        config: {
            type: 'phone',
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'user_status',
        label: 'Статус',
        input: 'select',
        config: {
            required: true,
            gridSize: 3,
            options: userStatuses.map((item) => ({
                id: item.Code,
                value: item.Code,
                text: item.Name,
            })),
        },
    },
    {
        name: 'org_id',
        label: 'Организация',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 6,
            placeholder: 'Выберите организацию',
            fieldText: 'org_name',
            dictionaryName: 'companies',
        },
    },
    {
        name: 'dept_id',
        label: 'Подразделение',
        input: 'autocomplete',
        config: {
            type: 'guid',
            required: true,
            gridSize: 6,
            placeholder: 'Выберите подразделение',
            fieldText: 'dept_name',
            dictionaryName: 'departments',
            filterFields: ['org_id'],
            selectProps: {
                valueField: 'Id',
                textField: 'Name',
            },
        },
    },
    {
        name: 'efficiency',
        label: 'Коэффициент эффективности',
        config: {
            type: 'number',
            gridSize: 2,
        },
    },
    {
        name: 'position',
        label: 'Должность',
        config: {
            required: true,
            gridSize: 3,
        },
    },
    {
        name: 'note',
        label: 'Описание',
        config: {
            required: true,
            gridSize: 7,
        },
    },
    {
        name: 'sms_notification',
        label: 'СМС-уведомления',
        input: 'universal',
        config: {
            type: 'checkbox',
            required: false,
            gridSize: 2,
        },
    },
    {
        name: 'email_notification',
        label: 'Email-уведомления',
        input: 'universal',
        config: {
            type: 'checkbox',
            required: false,
            gridSize: 3,
        },
    },
];

