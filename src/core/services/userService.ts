import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { IUserData, prepareUserData } from '@helpers/authHelper';

interface IUserSlice {
    isLoading: boolean;
    user: IUserData | null;
    users: IUserData[];
    darkMode: boolean;
}

const initialState: IUserSlice = {
    isLoading: false,
    user: null,
    users: [],
    darkMode: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fakeAuthRequest: (state) => {
            state.isLoading = true;
        },
        fakeAuthSuccess: (state, action: PayloadAction<any>) => {
            const userData = prepareUserData(action.payload?.result);
            document.cookie = `user=${JSON.stringify(userData)}`;
            state.isLoading = false;
            state.user = userData;
        },
        fakeAuthFailure: (state) => {
            state.isLoading = false;
        },

        logout: () => {
            return { ...initialState };
        },

        setUser: (state, action: PayloadAction<any>) => {
            state.user = action.payload;
        },

        authRequest: (state) => {
            state.isLoading = true;
        },
        authSuccess: (state, action: PayloadAction<any>) => {
            const userData = prepareUserData(action.payload?.result);
            document.cookie = `user=${JSON.stringify(userData)}`;
            state.isLoading = false;
            state.user = userData;
        },
        authFailure: (state) => {
            state.isLoading = false;
        },

        restorePasswordRequest: (state) => {
            state.isLoading = true;
        },
        restorePasswordSuccess: (state) => {
            state.isLoading = false;
        },
        restorePasswordFailure: (state) => {
            state.isLoading = false;
        },

        setNewPasswordRequest: (state) => {
            state.isLoading = true;
        },
        setNewPasswordSuccess: (state) => {
            state.isLoading = false;
        },
        setNewPasswordFailure: (state) => {
            state.isLoading = false;
        },

        setDarkMode: (state, action: PayloadAction<any>) => {
            localStorage.setItem('darkMode', JSON.stringify(action.payload.darkMode));
            state.darkMode = action.payload.darkMode;
        },
    },
});

const { reducer, actions } = userSlice;

export const {
    fakeAuthRequest,
    fakeAuthSuccess,
    fakeAuthFailure,

    logout,
    setUser,

    authRequest,
    authSuccess,
    authFailure,

    restorePasswordRequest,
    restorePasswordSuccess,
    restorePasswordFailure,

    setNewPasswordRequest,
    setNewPasswordSuccess,
    setNewPasswordFailure,

    setDarkMode,
} = actions;

export const userSelector = (state: RootState) => {
    const { isLoading, user, users, darkMode } = state.user;
    return { isLoading, user, users, darkMode };
};

export const fakeAuth = (id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Get',
        body: { id },
    };
    const actionTypes = {
        request: fakeAuthRequest,
        success: fakeAuthSuccess,
        failure: fakeAuthFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const auth = (userData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Auth',
        body: userData,
    };
    const actionTypes = {
        request: authRequest,
        success: authSuccess,
        failure: authFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const restorePassword = (email: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.PasswordNew',
        body: { EMail: email },
    };
    const actionTypes = {
        request: restorePasswordRequest,
        success: restorePasswordSuccess,
        failure: restorePasswordFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const setNewPassword = (data: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.PasswordSet',
        body: { ...data },
    };
    const actionTypes = {
        request: setNewPasswordRequest,
        success: setNewPasswordSuccess,
        failure: setNewPasswordFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
