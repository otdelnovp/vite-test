import { ITab } from '@core/Tabs/methods';
import { validateEmail } from '@helpers/methods';
import { rangeTemp } from '@helpers/dictionariesHelper';

export const tabList: ITab[] = [
    { value: 'about', title: 'Основные данные' },
    { value: 'users', title: 'Сотрудники' },
    { value: 'tariff', title: 'Тарифы' },
    { value: 'test_features', title: 'Тест новых функций' },
];

// company

export interface ICompanyData {
    CompanyId: string | null;
    CompanyName: string | null;
    LegalName: string | null;
    OwnershipType: string | null;
    Phone: string | null;
    Address: string | null;
    LegalAddress: string | null;
    Inn: number | null;
    Kpp: string | null;
    Comment: string | null;
    IsCustomer: boolean;
    IsSupplier: boolean;
    IsDeleted: boolean;
}

export const prepareCompanyData = (companyData: ICompanyData) => ({
    ...companyData,
});

export const findAboutErrors = (body: any, required: any) => ({
    CompanyName: required.CompanyName && !body.CompanyName,
    LegalName: required.LegalName && !body.LegalName,
    Address: required.Address && !body.Address,
    LegalAddress: required.LegalAddress && !body.LegalAddress,
    Inn: required.Inn && (!body?.Inn || body?.Inn?.toString().length < (body.OwnershipType !== 'ИП' ? 10 : 12)),
    Kpp: required.Kpp && (!body?.Kpp || body?.Kpp?.toString().length < 9),
    Phone: required.Phone && (!body?.Phone || body?.Phone?.toString().length < 10),
    Comment: required.Comment && !body.Comment,
});

export const validate = (validationErrors: any) => {
    for (const key in validationErrors) {
        if (validationErrors[key]) return false;
    }
    return true;
};

// user

export interface IUserData {
    UserId: string | null;
    UserName: string;
    Roles?: [];
    CompanyId?: string | null;
    CompanyName?: string | null;
    DriverLicense?: string | null;
    DriverLicenseDate?: string | null;
    PositionCode?: string | null;
    PositionName?: string | null;
    EMail: string | null;
    Phone: number | null;
    Passport: string | null;
    PassportDate: string | null;
    PassportIssuer: string | null;
    BirthDate?: string | null;
    Comment?: null;
    IsEmployee?: boolean;
    IsDeleted?: boolean;
}

export interface IUserFilters {
    UserName: string;
    PositionCode?: string | null;
}
export const defaultUserFilters: IUserFilters = {
    UserName: '',
    PositionCode: 'null',
};
export interface IUserFiltersData {
    Limit: number;
    Offset: number;
    CompanyId?: string | null;
    UserName?: string | null;
    PositionCode?: string | null;
}

export const prepareGetUsersFilters = (companyId: string, filters: IUserFilters, pager: ILkPager) => {
    const bodyFilters: IUserFiltersData = {
        ...pager,
        // ...filters,
        UserName: filters.UserName ? filters.UserName : null,
        PositionCode: !!filters.PositionCode && filters.PositionCode !== 'null' ? filters.PositionCode : null,
        CompanyId: companyId,
    };
    return bodyFilters;
};

export const userColumns = [
    { field: 'UserName', headerName: 'Имя сотрудника' },
    { field: 'Roles', headerName: 'Роль сотрудника' },
    { field: 'PositionName', headerName: 'Должность' },
    { field: 'Phone', headerName: 'Телефон' },
];

export const findUserErrors = (body: any, required: any) => ({
    UserName: required.UserName && !body?.UserName,
    BirthDate: required.BirthDate && !body?.BirthDate,
    EMail: required.EMail && !validateEmail(body?.EMail),
    Phone: required.Phone && (!body?.Phone || body?.Phone?.toString().length < 10),
    Roles: required.Roles && !body?.Roles?.length,
    PositionCode: required.PositionCode && !body?.PositionCode,
    Passport: required.Passport && (!body?.Passport || body?.Passport?.length < 10),
    PassportDate: required.PassportDate && !body?.PassportDate,
    PassportIssuer: required.PassportIssuer && !body?.PassportIssuer,
    DriverLicense: required.DriverLicense && (!body?.DriverLicense || body?.DriverLicense?.length < 10),
    DriverLicenseDate: required.DriverLicenseDate && !body?.DriverLicenseDate,
    Comment: required.Comment && !body?.Comment,
});

export interface ILkPager {
    Limit: number;
    Offset: number;
}
export const defaultLkPager: ILkPager = {
    Limit: 10,
    Offset: 0,
};
