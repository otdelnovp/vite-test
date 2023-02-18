import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { sortArrayByProp } from '@helpers/methods';
import {
    ICompanyData,
    prepareCompanyData,
    prepareGetUsersFilters,
    ILkPager,
    defaultLkPager,
    IUserFilters,
    defaultUserFilters,
} from '@pages/Lk/methods';

interface IUserSlice {
    isLoading: boolean;
    isLoadingList: boolean;
    isLoadingItem: boolean;
    company: ICompanyData | null;
    userList: any;
    userItem: any;
    count: number;
    pager: ILkPager;
    userFilters: IUserFilters;
}

const initialState: IUserSlice = {
    isLoading: false,
    isLoadingList: false,
    isLoadingItem: false,
    company: null,
    userList: null,
    userItem: null,
    count: 0,
    pager: defaultLkPager,
    userFilters: defaultUserFilters,
};

const lkSlice = createSlice({
    name: 'lk',
    initialState,
    reducers: {
        getCompanyRequest: (state) => {
            state.isLoading = true;
        },
        getCompanySuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.company = prepareCompanyData(action.payload?.result);
        },
        getCompanyFailure: (state) => {
            state.isLoading = false;
        },

        editCompanyRequest: (state) => {
            state.isLoading = true;
        },
        editCompanySuccess: (state) => {
            state.isLoading = false;
        },
        editCompanyFailure: (state) => {
            state.isLoading = false;
        },

        // pager

        setPager: (state, action: PayloadAction<any>) => {
            state.pager = action.payload;
        },
        resetPager: (state) => {
            state.pager = defaultLkPager;
        },

        // user

        setUserListFilters: (state, action: PayloadAction<any>) => {
            state.userFilters = action.payload;
        },
        resetUserListFilters: (state) => {
            state.isLoadingList = false;
            state.isLoadingItem = false;
            state.userList = null;
            state.userItem = null;
            state.count = 0;
            state.pager = defaultLkPager;
            state.userFilters = defaultUserFilters;
        },

        resetUserList: (state) => {
            state.userList = null;
            state.isLoadingList = false;
        },

        getUserListRequest: (state) => {
            state.isLoadingList = true;
        },
        getUserListSuccess: (state, action: PayloadAction<any>) => {
            state.isLoadingList = false;
            // @ts-ignore
            state.userList = sortArrayByProp(action.payload?.result, 'UserName');
        },
        getUserListFailure: (state) => {
            state.isLoadingList = false;
        },

        getUserListCountRequest: (state) => {
            state.isLoadingList = true;
            state.count = 0;
        },
        getUserListCountSuccess: (state, action: PayloadAction<any>) => {
            state.isLoadingList = false;
            state.count = action.payload?.result?.Count || 0;
        },
        getUserListCountFailure: (state) => {
            state.isLoadingList = false;
            state.count = 0;
        },

        getUserRequest: (state) => {
            state.isLoadingItem = true;
        },
        getUserSuccess: (state, action: PayloadAction<any>) => {
            state.isLoadingItem = false;
            state.userItem = action.payload?.result;
        },
        getUserFailure: (state) => {
            state.isLoadingItem = false;
        },

        editUserRequest: (state) => {
            state.isLoadingItem = true;
        },
        editUserSuccess: (state) => {
            state.isLoadingItem = false;
        },
        editUserFailure: (state) => {
            state.isLoadingItem = false;
        },

        setUser: (state, action: PayloadAction<any>) => {
            state.userItem = action.payload;
        },
    },
});

const { reducer, actions } = lkSlice;

export const {
    getCompanyRequest,
    getCompanySuccess,
    getCompanyFailure,

    editCompanyRequest,
    editCompanySuccess,
    editCompanyFailure,

    setPager,
    resetPager,

    // user

    setUserListFilters,
    resetUserListFilters,

    resetUserList,

    getUserListRequest,
    getUserListSuccess,
    getUserListFailure,

    getUserListCountRequest,
    getUserListCountSuccess,
    getUserListCountFailure,

    getUserRequest,
    getUserSuccess,
    getUserFailure,

    editUserRequest,
    editUserSuccess,
    editUserFailure,

    setUser,
} = actions;

export const lkSelector = (state: RootState) => {
    const { isLoading, isLoadingList, isLoadingItem, company, count, pager, userList, userItem, userFilters } = state.lk;
    return {
        isLoading,
        isLoadingList,
        isLoadingItem,
        company,
        userList,
        userItem,
        count,
        pager,
        userFilters,
    };
};

//company

export const getCompany = (companyId: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Company.Get',
        body: { CompanyId: companyId },
    };
    const actionTypes = {
        request: getCompanyRequest,
        success: getCompanySuccess,
        failure: getCompanyFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editCompany = (companyData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Company.Edit',
        body: companyData,
    };
    const actionTypes = {
        request: getCompanyRequest,
        success: getCompanySuccess,
        failure: getCompanyFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// user

export const getUserList = (companyId: any, filters: any, pager: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.List',
        body: prepareGetUsersFilters(companyId, filters, pager),
    };
    const actionTypes = {
        request: getUserListRequest,
        success: getUserListSuccess,
        failure: getUserListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getUserListCount = (companyId: any, filters: any, pager: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Count',
        body: prepareGetUsersFilters(companyId, filters, pager),
    };
    const actionTypes = {
        request: getUserListCountRequest,
        success: getUserListCountSuccess,
        failure: getUserListCountFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getUser = (userId: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Get',
        body: { UserId: userId },
    };
    const actionTypes = {
        request: getUserRequest,
        success: getUserSuccess,
        failure: getUserFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editUser = (userData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Edit',
        body: userData,
    };
    const actionTypes = {
        request: editUserRequest,
        success: editUserSuccess,
        failure: editUserFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
