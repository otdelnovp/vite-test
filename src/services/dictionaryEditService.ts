import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';

import { IUserData } from '@helpers/authHelper';
import { phoneMask } from '@helpers/methods';

import { IDictionaryListElement, IDictionaryElement } from '../helpers/dictionaryEditHelper';

import { sortDictionaryByProp } from '../helpers/dictionariesHelper';
import { id } from 'date-fns/locale';

export interface IDictionaryEditSlice {
    listData: IDictionaryListElement[];
    elementData: IDictionaryElement | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
    rowCount: number;
}

const initialState: IDictionaryEditSlice = {
    listData: [],
    elementData: {} as IDictionaryElement,
    isLoading: false,
    isSuccess: false,
    isError: false,
    rowCount: -1,
};

const dictionaryEditSlice = createSlice({
    name: 'dictionaryEdit',
    initialState,
    reducers: {
        resetDictionaryEdit: () => {
            return { ...initialState };
        },

        // GET DICTIONARY LIST
        getDictionaryListRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.listData = [];
        },
        getDictionaryListSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            if (action.payload.result.length) {
                state.listData = action.payload.result;
            } else {
                state.listData = action.payload.result.rows;
                state.rowCount = action.payload.result.row_count;
            }
        },
        getDictionaryListFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // SET DICTIONARY LIST
        setDictionaryList: (state, action) => {
            state.listData = action.payload;
        },

        // GET DICTIONARY LIST BY COMPANY ID
        getDictionaryListByCompanyIdRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.listData = [];
        },
        getDictionaryListByCompanyIdSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.listData = sortDictionaryByProp(action.payload.result, 'Name');
        },
        getDictionaryListByCompanyIdFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // GET DICTIONARY ELEMENT
        getDictionaryElementRequest: (state, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.listData = [];
        },
        getDictionaryElementSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.elementData = action.payload.result;
        },
        getDictionaryElementFailure: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // CLEAR DICTIONARY ELEMENT
        clearDictionaryElement: (state) => {
            state.elementData = null;
        },

        // EDIT DICTIONARY ELEMENT
        editDictionaryElementRequest: (state, action: PayloadAction<any>) => {
        },
        editDictionaryElementSuccess: (state, action: PayloadAction<any>) => {
        },
        editDictionaryElementFailure: (state, action: PayloadAction<any>) => {
        },
    },
});

const { reducer, actions } = dictionaryEditSlice;

export const {
    resetDictionaryEdit,

    getDictionaryListRequest,
    getDictionaryListSuccess,
    getDictionaryListFailure,

    setDictionaryList,

    getDictionaryListByCompanyIdRequest,
    getDictionaryListByCompanyIdSuccess,
    getDictionaryListByCompanyIdFailure,

    getDictionaryElementRequest,
    getDictionaryElementSuccess,
    getDictionaryElementFailure,

    clearDictionaryElement,

    editDictionaryElementRequest,
    editDictionaryElementSuccess,
    editDictionaryElementFailure,

} = actions;

export const dictionaryListSelector = (state: RootState) => {
    const { listData, isLoading, isError, isSuccess, rowCount } = state.dictionaryEdit;
    return { listData, isLoading, isError, isSuccess, rowCount };
};

export const dictionaryElementSelector = (state: RootState) => {
    const { elementData, isLoading, isError, isSuccess } = state.dictionaryEdit;
    return { elementData, isLoading, isError, isSuccess };
};

export const dictEditSelectors = {
    listData: dictionaryListSelector,
    elementData: dictionaryElementSelector,
};

export const getDictionaryList = (type: string, user: IUserData | null | undefined, options?: IAsyncOptions) => {
    const requestBody =  options?.params?.hasOwnProperty('page_size') ?
        {
            type: type,
            body: {
                ...options?.params,
                IsDeleted: null,
            },
        } : {
            type: type,
            body: {
                IsDeleted: null,
            },
        };
    const actionTypes = {
        request: getDictionaryListRequest,
        success: getDictionaryListSuccess,
        failure: getDictionaryListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getDictionaryListByCompanyId = (type: string, user: IUserData | null | undefined, companyId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: type,
        body: {
            CompanyId: companyId,
            IsDeleted: null,
        },
    };
    const actionTypes = {
        request: getDictionaryListByCompanyIdRequest,
        success: getDictionaryListByCompanyIdSuccess,
        failure: getDictionaryListByCompanyIdFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getDictionaryElement = (type: string, id: string, options?: IAsyncOptions) => {
    const idName = type === "User.Get" ? "id" : "Id";
    const requestBody = {
        type: type,
        body: {
            [idName]: id,
        },
    };
    const actionTypes = {
        request: getDictionaryElementRequest,
        success: getDictionaryElementSuccess,
        failure: getDictionaryElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editDictionaryElement = (type: string, body: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: type,
        body: body,
    };
    const actionTypes = {
        request: editDictionaryElementRequest,
        success: editDictionaryElementSuccess,
        failure: editDictionaryElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
