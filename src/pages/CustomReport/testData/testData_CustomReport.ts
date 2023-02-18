import { ICustomReportElement } from '../model';

export const customReport_TableList = [
    {
        title: 'Пользователи',
        name: 'users',
        columns: [
            {
                title: 'ИД',
                name: 'id',
            },
            {
                title: 'Логин',
                name: 'username',
            },
            {
                title: 'ИДОрганизации',
                name: 'org_id',
            },
            {
                title: 'Статус',
                name: 'user_status',
            },
        ],
    },
    {
        title: 'Организации',
        name: 'companies',
        columns: [
            {
                title: 'ИД',
                name: 'Id',
            },
            {
                title: 'Наименование',
                name: 'Name',
            },
            {
                title: 'ИНН',
                name: 'INN',
            },
            {
                title: 'КПП',
                name: 'KPP',
            },
            {
                title: 'ЮрАдрес',
                name: 'LegalAddress',
            },
            {
                title: 'Телефон',
                name: 'Phone',
            },
        ],
    },
    {
        title: 'Проекты',
        name: 'projects',
        columns: [
            {
                title: 'ИД',
                name: 'Id',
            },
            {
                title: 'Наименование',
                name: 'Name',
            },
            {
                title: 'ИД организации',
                name: 'CompanyId',
            },
        ],
    },
];

export const customReport_DataSources = [
    {
        label: 'БД Камотив',
        value: 'kamotiv',
    },
    {
        label: 'БД Учет рабочего времени',
        value: 'time',
    },
];

export const customReport_Get: ICustomReportElement = {
    id: '96721418-8521-4fdf-856b-3a0d9a2ca4d4',
    name: 'Отчет по пользователям организаций',
    reportType: 'table',
    dataSource: 'kamotiv',
    tables: ['users', 'companies'],
    tableFields: [
        {
            table: 'users',
            field: 'username',
            title: 'Логин',
            order: 1,
            // fieldType: 'chartValue',
        },
        {
            table: 'users',
            field: 'user_status',
            title: 'Статус_пользователя',
            order: 2,
            // fieldType: 'chartName',
        },
        {
            table: 'companies',
            field: 'Name',
            title: 'Организация',
            order: 3,
            // fieldType: 'chartGroup',
        },
        {
            table: 'companies',
            field: 'Phone',
            title: 'Рабочий_телефон',
            order: 4,
        },
    ],
    relations: [
        {
            table1: 'users',
            joinType: 'left',
            table2: 'companies',
            table1Field: 'org_id',
            comparsionType: 'equal',
            table2Field: 'Id',
        },
    ],
    conditions: [
        {
            table: 'users',
            field: 'username',
            comparsionType: 'equal',
            value: 'UserName',
        },
    ],
    conditionParameters: [
        {
            parameter: 'UserName',
            value: 'Иванов',
        },
    ],
    sort: [
        {
            table: 'companies',
            field: 'Name',
            sortType: 'asc',
            order: 1,
        },
        {
            table: 'users',
            field: 'username',
            sortType: 'asc',
            order: 2,
        },
    ],
};

export const customReport_ComparsionTypeList = [
    {
        code: 'equal',
        name: 'Равно',
    },
    {
        code: 'not_equal',
        name: 'Не равно',
    },
    {
        code: 'more',
        name: 'Больше>',
    },
    {
        code: 'less',
        name: 'Меньше',
    },
    {
        code: 'more_or_equal',
        name: 'Больше или равно',
    },
    {
        code: 'less_or_equal',
        name: 'Меньше или равно',
    },
];

export const customReport_SortTypeList = [
    {
        code: 'asc',
        name: 'По возрастанию',
    },
    {
        code: 'desc',
        name: 'По убыванию',
    },
];

export const customReport_JoinTypeList = [
    {
        code: 'inner',
        name: 'Внутреннее',
    },
    {
        code: 'full',
        name: 'Полное',
    },
    {
        code: 'left',
        name: 'Левое',
    },
    {
        code: 'right',
        name: 'Правое',
    },
];

export const customReport_List = [
    {
        id: '96721418-8521-4fdf-856b-3a0d9a2ca4d4',
        name: 'Отчет по пользователям организаций',
    },
];

export const customReport_Report = [
    {
        production_product: 'Сталь',
        production_year: '2002',
        production_volume: '20',
    },
    {
        production_product: 'Чугун',
        production_year: '2002',
        production_volume: '30',
    },
    {
        production_product: 'Окатыши',
        production_year: '2002',
        production_volume: '45',
    },
    {
        production_product: 'Прокат',
        production_year: '2002',
        production_volume: '25',
    },

    {
        production_product: 'Сталь',
        production_year: '2003',
        production_volume: '27',
    },
    {
        production_product: 'Чугун',
        production_year: '2003',
        production_volume: '37',
    },
    {
        production_product: 'Окатыши',
        production_year: '2003',
        production_volume: '47',
    },
    {
        production_product: 'Прокат',
        production_year: '2003',
        production_volume: '7',
    },

    {
        production_product: 'Сталь',
        production_year: '2004',
        production_volume: '32',
    },
    {
        production_product: 'Чугун',
        production_year: '2004',
        production_volume: '35',
    },
    {
        production_product: 'Окатыши',
        production_year: '2004',
        production_volume: '45',
    },
    {
        production_product: 'Прокат',
        production_year: '2004',
        production_volume: '65',
    },

    {
        production_product: 'Сталь',
        production_year: '2005',
        production_volume: '32',
    },
    {
        production_product: 'Чугун',
        production_year: '2005',
        production_volume: '35',
    },
    {
        production_product: 'Окатыши',
        production_year: '2005',
        production_volume: '45',
    },
    {
        production_product: 'Прокат',
        production_year: '2005',
        production_volume: '65',
    },
];
