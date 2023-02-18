import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { dateToServerTimestamp } from '@helpers/dateHelper';

import { IWorkException, IWorkExceptionFilter, IWorkExceptionInterval, prepareWorkException } from '@pages/WorkException/methods';

interface IWorkExceptionSlice {
    isLoading: boolean;
    isLoadingSet: boolean;
    workException: IWorkException[];
}

const initialState: IWorkExceptionSlice = {
    isLoading: false,
    isLoadingSet: false,
    workException: [],
};

const workExceptionSlice = createSlice({
    name: 'workException',
    initialState,
    reducers: {
        getWorkExceptionRequest: (state: IWorkExceptionSlice, action: PayloadAction<any>) => {
            if (!action.payload.withoutLoader) {
                state.isLoading = true;
                state.workException = [];
            }
        },
        getWorkExceptionSuccess: (state: IWorkExceptionSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.workException = prepareWorkException(action.payload?.result);
        },
        getWorkExceptionFailure: (state: IWorkExceptionSlice) => {
            state.isLoading = false;
            state.workException = [];
        },

        setWorkExceptionDayRequest: (state: IWorkExceptionSlice) => {
            state.isLoadingSet = true;
        },
        setWorkExceptionDaySuccess: (state: IWorkExceptionSlice) => {
            state.isLoadingSet = false;
        },
        setWorkExceptionDayFailure: (state: IWorkExceptionSlice) => {
            state.isLoadingSet = false;
        },
    },
});

const { reducer, actions } = workExceptionSlice;

export const {
    getWorkExceptionRequest,
    getWorkExceptionSuccess,
    getWorkExceptionFailure,
    setWorkExceptionDayRequest,
    setWorkExceptionDaySuccess,
    setWorkExceptionDayFailure,
} = actions;

export const workExceptionSelector = (state: RootState) => {
    const { isLoading, isLoadingSet, workException } = state.workException;
    return { isLoading, isLoadingSet, workException };
};

export const getWorkException = (filter: IWorkExceptionFilter, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Work.ExceptionReport',
        body: {
            CompanyId: filter.CompanyId,
            DepartmentId: filter.DepartmentId,
            DateFrom: `${filter.Year}-${filter.Month}-01`,
        },
    };
    const actionTypes = {
        request: getWorkExceptionRequest,
        success: getWorkExceptionSuccess,
        failure: getWorkExceptionFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const setWorkExceptionDay = (interval: IWorkExceptionInterval, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Work.ExceptionEdit',
        body: {
            UserId: interval.UserInfo.UserId,
            DateFrom: interval.DateFrom,
            DateTo: interval.DateTo,
            WorkExceptionTypeId: interval.WorkExceptionTypeId,
        },
    };
    const actionTypes = {
        request: setWorkExceptionDayRequest,
        success: setWorkExceptionDaySuccess,
        failure: setWorkExceptionDayFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
