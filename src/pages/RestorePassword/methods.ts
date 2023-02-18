import { validatePassword } from '@pages/Login/methods';
import { getHash, validateEmail, validatePhone } from '@helpers/methods';

export const emptyRestorePasswordBody = {
    email: '',
    phone: '',
    password: '',
    retryPassword: '',
};

export const validateRestorePasswordFields = (data: typeof emptyRestorePasswordBody) => {
    return {
        email: !data.phone && !validateEmail(data.email),
        phone: !data.email && !validatePhone(data.phone),
    };
};

export const validateSetNewPasswordFields = (data: typeof emptyRestorePasswordBody) => {
    return {
        password: !validatePassword(data.password),
        retryPassword: data.password !== data.retryPassword,
    };
};

export const prepareSetNewPasswordData = (password: string, restoreCode: string) => ({
    Hash: restoreCode,
    NewPassword: getHash(password),
});
