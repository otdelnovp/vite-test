export const emptyRequestBody = { test: 1 };

export interface IDictOption {
    id: string;
    value: string;
    text: string;
}
export const emptyDictOption = {
    id: '',
    value: '',
    text: '',
};

export interface ICompanyDictOption {
    Id: string;
    Name: string;
}
export const companyDictOptionEmpty: ICompanyDictOption = {
    Id: '',
    Name: '',
};
export type ICompaniesDictionary = Array<ICompanyDictOption>;

export interface IDepartmentDictOption {
    Id: string;
    Name: string;
}
export const departmentDictOptionEmpty: IDepartmentDictOption = {
    Id: '',
    Name: '',
};
export type IDepartmentsDictionary = Array<IDepartmentDictOption>;

// export interface ICompanyUserDictOption {
//     Id: string;
//     Name: string;
//     FirstName: string;
//     LastName: string;
//     FullName: string;
//     PositionName: string;
//     Phone: number | null;
// }
export interface ICompanyUserDictOption {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    full_name: string;
    position: string;
    phone_number: number | null;
}
// export const companyUserDictOptionEmpty: ICompanyUserDictOption = {
//     Id: '',
//     Name: '',
//     FirstName: '',
//     LastName: '',
//     FullName: '',
//     PositionName: '',
//     Phone: null,
// };
export const companyUserDictOptionEmpty: ICompanyUserDictOption = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    full_name: '',
    position: '',
    phone_number: null,
};
export type ICompanyUsersDictionary = Array<ICompanyUserDictOption>;

export interface IWorkExceptionTypeDictOption {
    Id: string;
    Name: string;
    Code: string;
    ColorCode: string;
    CompanyId: string;
    CompanyName: string;
    IsDeleted: boolean;
}
export const workExceptionTypeDictOptionEmpty: IWorkExceptionTypeDictOption = {
    Id: '',
    Name: '',
    Code: '',
    ColorCode: '',
    CompanyId: '',
    CompanyName: '',
    IsDeleted: false,
};
export type IWorkExceptionTypesDictionary = Array<IWorkExceptionTypeDictOption>;

export interface ITaskTypeDictOption {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}
export const taskTypeDictOptionEmpty: ITaskTypeDictOption = {
    Id: '',
    Name: '',
    IsDeleted: false,
};
export type ITaskTypesDictionary = Array<ITaskTypeDictOption>;

export interface ITaskStateDictOption {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}
export const taskStateDictOptionEmpty: ITaskStateDictOption = {
    Id: '',
    Name: '',
    IsDeleted: false,
};
export type ITaskStatesDictionary = Array<ITaskStateDictOption>;

export interface ITaskSprintDictOption {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}
export const taskSprintDictOptionEmpty: ITaskSprintDictOption = {
    Id: '',
    Name: '',
    IsDeleted: false,
};
export type ITaskSprintsDictionary = Array<ITaskSprintDictOption>;

export interface IBoardStatesDictOption {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}
export type IBoardStatesDictionary = Array<IBoardStatesDictOption>;

export interface IProjectsDictOption {
    Id: string;
    Name: string;
    IsDeleted: boolean;
}
export type IProjectsDictionary = Array<IProjectsDictOption>;

export interface IProjectTasksDictOption {
    Id: string;
    Title: string;
    IsDeleted: boolean;
}
export type IProjectTasksDictionary = Array<IProjectTasksDictOption>;

export interface IUserRoleDictOption {
    Code: string;
    Name: string;
    IsDeleted: boolean;
}
export type IUserRolesDictionary = Array<IUserRoleDictOption>;
export const userRoles: IUserRolesDictionary = [
    {
        Code: 'MNG',
        Name: 'Менеджер',
        IsDeleted: false,
    },
    {
        Code: 'DRWP',
        Name: 'Водитель',
        IsDeleted: false,
    },
];

export interface IUserPositionDictOption {
    Code: string;
    Name: string;
    IsDeleted: boolean;
}
export type IUserPositionsDictionary = Array<IUserPositionDictOption>;
export const userPositions: IUserPositionsDictionary = [
    {
        Code: 'MGR',
        Name: 'Менеджер',
        IsDeleted: false,
    },
    {
        Code: 'DRV',
        Name: 'Водитель',
        IsDeleted: false,
    },
];

export interface ITaskPriorityDictOption {
    Code: string;
    Name: string;
}
export type ITaskPrioritiesDictionary = Array<ITaskPriorityDictOption>;
export const taskPriorities: ITaskPrioritiesDictionary = [
    {
        Code: 'L',
        Name: 'Низкий',
    },
    {
        Code: 'M',
        Name: 'Средний',
    },
    {
        Code: 'H',
        Name: 'Высокий',
    },
    {
        Code: 'C',
        Name: 'Критический',
    },
];

export interface IDocumentTypeDictOption {
    Code: string;
    Name: string;
    ObjectTypeCode: string | null;
}
export type IDocumentTypesDictionary = Array<IDocumentTypeDictOption>;
export const documentTypes: IDocumentTypesDictionary = [
    {
        Code: 'SACT',
        Name: 'Акт об оказании услуг',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'INVC',
        Name: 'Счет-фактура',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'PKLS',
        Name: 'Товарная накладная',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'FRCP',
        Name: 'Экспедиторская расписка',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'ATGM',
        Name: 'Доверенность ТМЦ',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'ASTF',
        Name: 'Поручение экспедитору',
        ObjectTypeCode: 'ROUTE',
    },
    {
        Code: 'ANYF',
        Name: 'Прочее',
        ObjectTypeCode: null,
    },
];

export interface ICalendarProductionStateDictOption {
    Name: string;
    Code: string;
    IsWork: boolean;
}
export type ICalendarProductionStatesDictionary = Array<ICalendarProductionStateDictOption>;
export const calendarProductionStates: ICalendarProductionStatesDictionary = [
    {
        Code: 'R',
        IsWork: false,
        Name: 'Выходной',
    },
    {
        Code: 'W',
        IsWork: true,
        Name: 'Рабочий',
    },
    {
        Code: 'S',
        IsWork: true,
        Name: 'Короткий',
    },
    {
        Code: 'H',
        IsWork: false,
        Name: 'Праздничный',
    },
];

export interface ILocationDictOption {
    CountryCode: string;
    CountryName: string;
    Latitude: number;
    Longitude: number;
    LocationId: string | null;
    Name: string;
    Range: number;
    RegionId: string | null;
    RegionName: string;
}
export const locationDictOptionEmpty: ILocationDictOption = {
    LocationId: null,
    Name: '',
    CountryCode: '',
    CountryName: '',
    RegionId: null,
    RegionName: '',
    Range: 50,
    Latitude: 0,
    Longitude: 0,
};

export type ILocationDictionary = Array<ILocationDictOption>;

export interface IGeography {
    Latitude: number;
    Longitude: number;
}

export interface ICompanyStatusDictOption {
    Code: string;
    Name: string;
}
export type ICompanyStatuses = Array<ICompanyStatusDictOption>;
export const companyStatuses: ICompanyStatuses = [
    {
        Code: 'N',
        Name: 'Новая',
    },
    {
        Code: 'A',
        Name: 'Подтвержденная',
    },
];

export interface ICompanyOwnershipTypeDictOption {
    Code: string;
    Name: string;
}
export type ICompanyOwnershipTypeDictionary = Array<ICompanyOwnershipTypeDictOption>;

export interface IUserStatusDictOption {
    Code: string;
    Name: string;
}
export type IUserStatusDictionary = Array<IUserStatusDictOption>;
export const userStatuses: IUserStatusDictionary = [
    {
        Code: 'N',
        Name: 'Новый',
    },
    {
        Code: 'A',
        Name: 'Активирован',
    },
];

export interface IProjectStateDictOption {
    Code: string;
    Name: string;
}
export type IProjectStateDictionary = Array<IProjectStateDictOption>;
export const projectStates: IProjectStateDictionary = [
    {
        Code: 'M',
        Name: 'Моделирование',
    },
    {
        Code: 'O',
        Name: 'Оптимизирован',
    },
    {
        Code: 'C',
        Name: 'Согласован',
    },
    {
        Code: 'A',
        Name: 'Утвержден',
    },
    {
        Code: 'H',
        Name: 'В архиве',
    },
];

export interface IWeeklyReportStateDictOption {
    Code: 'D' | 'R' | 'A' | 'N';
    Name: string;
    Color: string;
}
export type IWeeklyReportStateDictionary = Array<IWeeklyReportStateDictOption>;
export const weeklyReportStates: IWeeklyReportStateDictionary = [
    {
        Code: 'D',
        Name: 'Черновик',
        Color: 'F1F1F1',
    },
    {
        Code: 'R',
        Name: 'Отчет завершен',
        Color: 'FFFDDD',
    },
    {
        Code: 'A',
        Name: 'Согласован',
        Color: 'DDFFDD',
    },
    {
        Code: 'N',
        Name: 'Отклонен',
        Color: 'FFDDDD',
    },
];

export interface IRolesDictOption {
    id: string;
    title: string;
}
export type IRolesDictionary = Array<IRolesDictOption>;

export interface IUserGroupsDictOption {
    id: string;
    group_name: string;
}
export type IUserGroupsDictionary = Array<IUserGroupsDictOption>;

export interface IBoardStateSortDictOption {
    Code: string;
    Name: string;
}
export type IBoardStateSortDictionary = Array<IBoardStateSortDictOption>;
export const boardStateSort: IBoardStateSortDictionary = [
    {
        Code: 'StartDatePlan',
        Name: 'Дата начала (план)',
    },
    {
        Code: 'StartDateFact',
        Name: 'Дата начала (факт)',
    },
    {
        Code: 'EndDateFact',
        Name: 'Дата завершения (факт)',
    },
];

export const dictionaries = {
    userRoles,
    userPositions,
    taskPriorities,
    documentTypes,
    calendarProductionStates,
    companyStatuses,
    userStatuses,
};

export type IAsyncDictionaries =
    | IDictOption
    | ICompanyDictOption
    | ICompanyUserDictOption
    | ICompanyOwnershipTypeDictOption
    | IWorkExceptionTypeDictOption
    | ITaskTypeDictOption
    | ITaskStateDictOption
    | ITaskSprintDictOption;

export const sortDictionaryByProp = (dict: any[], prop: string) => {
    return dict ? dict.sort((a: any, b: any) => -(b[prop] || '').localeCompare((a[prop] || '')[0])) : [];
};

export const rangeTemp: [number, number] = [-25, 25];


// DASHBOARD

export interface IOrderTypeDictOption {
    Code: string;
    Name: string;
}
export type IOrderTypesDictionary = Array<IOrderTypeDictOption>;
export const orderTypes: IOrderTypesDictionary = [
    {
        Code: 'C',
        Name: 'Доработка',
    },
    {
        Code: 'P',
        Name: 'Исправление',
    },
    {
        Code: 'S',
        Name: 'Сопровождение',
    },
];

export interface IOrderStateDictOption {
    Code: string;
    Name: string;
}
export type IOrderStatesDictionary = Array<IOrderStateDictOption>;
export const orderStates: IOrderStatesDictionary = [
    {
        Code: 'NW',
        Name: 'Не начата',
    },
    {
        Code: 'CH',
        Name: 'С опозданием',
    },
    {
        Code: 'GO',
        Name: 'Отложена',
    },
    {
        Code: 'PL',
        Name: 'В архиве',
    },
    {
        Code: 'WR',
        Name: 'В работе',
    },
    {
        Code: 'CL',
        Name: 'Завершена',
    },
    {
        Code: 'CN',
        Name: 'Отменена',
    },
];
