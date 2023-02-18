import moment from 'moment';
import { Configuration } from '../config';
import { getHash } from '@helpers/methods';
import { Location } from 'history';

export interface IUserData {
    Id?: string;
    Name?: string;
    UserId: string;
    UserName: string;
    CompanyId: string | null;
    CompanyName: string | null;
    DepartmentId: string | null;
    DepartmentName: string | null;
    FirstName: string;
    LastName: string;
    FullName: string;
    EMail?: string;
    Phone?: number | null;
}

export const isAuthorized = (user: IUserData | null) => !!user?.UserId;
export const isSuperuser = (user: IUserData | null) => !!user?.UserId;
export const isSupplier = (user: IUserData | null) => !!user?.UserId;
export const isCustomer = (user: IUserData | null) => !!user?.UserId;

export const getPasswordHash = (passwordHash: string) => {
    const passwordDaily = passwordHash + moment().format('YYYY-MM-DD').toString() + Configuration.SIGN;
    return getHash(passwordDaily);
};

export const prepareUserData = (userData: any) => ({
    UserId: userData?.id,
    UserName: userData?.username,
    FirstName: userData?.first_name,
    LastName: userData?.last_name,
    FullName: `${userData?.last_name} ${userData?.first_name}`,
    CompanyId: userData?.org_id,
    CompanyName: userData?.org_name,
    DepartmentId: userData?.dept_id,
    DepartmentName: userData?.dept_name,
});

export const isOuterAuth = (location: Location) => {
    const pathname = location.pathname;
    const pathSplit = pathname.split('/');
    const isAuthPath = pathSplit.indexOf('auth');
    if (isAuthPath !== -1) {
        const authSplit = pathSplit[isAuthPath + 1].split(':');
        const login = authSplit[0];
        const password = authSplit[1];
        return { isAuthPath: isAuthPath !== -1, login, password };
    }
    return { isAuthPath: isAuthPath !== -1, login: '', password: '' };
};
