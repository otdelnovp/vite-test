import { getHash, validateEmail, validatePhone } from '@helpers/methods';
import { getPasswordHash } from '@helpers/authHelper';

export const emptyLoginBody = {
    name: '',
    email: '',
    phone: '',
    password: '',
    remember: true,
};

export const validateLoginFields = (data: typeof emptyLoginBody) => {
    return {
        email: !data.phone && !validateEmail(data.email),
        phone: !data.email && !validatePhone(data.phone),
        password: !validatePassword(data.password),
    };
};

export const validatePassword = (password: string) => {
    return password?.length >= 3;
};

export const prepareAuthData = (data: any) => ({
    Login: data.email ? data.email : data.phone,
    Hash: getPasswordHash(getHash(data.password)),
});
