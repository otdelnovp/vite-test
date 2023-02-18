import { currentYear, currentMonth } from '@helpers/dateHelper';
import { sortArrayByProp } from '@helpers/methods';

export interface IWorkExceptionUserInfo {
    UserId: string;
    UserName: string;
    DepartmentName: string;
}
export interface IWorkExceptionInterval {
    DateFrom: string;
    DateTo: string;
    WorkExceptionTypeId?: string | null;
    UserInfo: IWorkExceptionUserInfo;
}
export interface IWorkExceptionItem {
    Date: string;
    WorkExceptionTypeId: string;
}
export interface IWorkExceptionUser {
    UserId: string;
    UserName: string;
    WorkExceptions: IWorkExceptionItem[] | null;
}
export interface IWorkException {
    DepartmentId: string;
    DepartmentName: string;
    Users: IWorkExceptionUser[] | null;
}

export interface IWorkExceptionFilter {
    Year: string;
    Month: string;
    CompanyId: string | null;
    DepartmentId: string | null;
}

export const workExceptionFilterInit: IWorkExceptionFilter = {
    Year: currentYear.toString(),
    Month: currentMonth.toString(),
    CompanyId: null,
    DepartmentId: null,
};

export const prepareWorkException = (workException: IWorkException[]) => {
    if (!workException) return [];
    return sortArrayByProp(
        workException.filter((item) => item.Users?.length).map((item) => ({ ...item, Users: sortArrayByProp(item.Users, 'UserName') })),
        'DepartmentName',
    );
};
