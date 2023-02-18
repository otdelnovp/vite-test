import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';

import { IWeeklyReportElement } from '@pages/WeeklyReport/model';
import { IWeeklyReportColumnElement } from '@pages/WeeklyReport/columns';
import { IWeeklyReportListFilter } from '@pages/WeeklyReport/WeeklyReportListFilter/model';
import { IWeeklyReportStateBody } from '@helpers/weeklyReportHelper';
import { IUserElement } from '@pages/Dictionary/User/model';

interface IWeeklyReportSlice {
    isLoading: boolean;
    weeklyReportList: IWeeklyReportColumnElement[];
    rowCount: number;
    weeklyReportElement: IWeeklyReportElement;
}

const initialState: IWeeklyReportSlice = {
    isLoading: false,
    weeklyReportList: [],
    rowCount: 0,
    weeklyReportElement: {} as IWeeklyReportElement,
};

const workedTimeSlice = createSlice({
    name: 'workedTime',
    initialState,
    reducers: {
        // LIST
        getWeeklyReportListRequest: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.weeklyReportList = [];
        },
        getWeeklyReportListSuccess: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.rowCount = action.payload?.result.row_count;
            state.weeklyReportList = action.payload?.result.rows;
        },
        getWeeklyReportListFailure: (state: IWeeklyReportSlice) => {
            state.isLoading = false;
        },

        // GET ELEMENT
        getWeeklyReportElementRequest: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.weeklyReportElement = {} as IWeeklyReportElement;
        },
        getWeeklyReportElementSuccess: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.weeklyReportElement = { ...action.payload?.result };
        },
        getWeeklyReportElementFailure: (state: IWeeklyReportSlice) => {
            state.isLoading = false;
        },

        // CLEAR ELEMENT
        clearWeeklyReportElement: (state) => {
            state.weeklyReportElement = {} as IWeeklyReportElement;
        },

        // ADD ELEMENT
        addWeeklyReportElementRequest: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
        },
        addWeeklyReportElementSuccess: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
        },
        addWeeklyReportElementFailure: (state: IWeeklyReportSlice) => {
            state.isLoading = false;
        },

        // ADD STATE
        addWeeklyReportStateRequest: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {},
        addWeeklyReportStateSuccess: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {},
        addWeeklyReportStateFailure: (state: IWeeklyReportSlice) => {},

        // GET WORKER DATA
        getWorkerDataRequest: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {},
        getWorkerDataSuccess: (state: IWeeklyReportSlice, action: PayloadAction<any>) => {},
        getWorkerDataFailure: (state: IWeeklyReportSlice) => {},
    },
});

const { reducer, actions } = workedTimeSlice;

export const {
    getWeeklyReportListRequest,
    getWeeklyReportListSuccess,
    getWeeklyReportListFailure,

    getWeeklyReportElementRequest,
    getWeeklyReportElementSuccess,
    getWeeklyReportElementFailure,

    clearWeeklyReportElement,

    addWeeklyReportElementRequest,
    addWeeklyReportElementSuccess,
    addWeeklyReportElementFailure,

    addWeeklyReportStateRequest,
    addWeeklyReportStateSuccess,
    addWeeklyReportStateFailure,

    getWorkerDataRequest,
    getWorkerDataSuccess,
    getWorkerDataFailure,
} = actions;

export const weeklyReportListSelector = (state: RootState) => {
    const { isLoading, weeklyReportList, rowCount } = state.weeklyReport;
    return { isLoading, weeklyReportList, rowCount };
};

export const weeklyReportElementSelector = (state: RootState) => {
    const { isLoading, weeklyReportElement } = state.weeklyReport;
    return { isLoading, weeklyReportElement };
};

export const getWeeklyReportList = (
    filter: IWeeklyReportListFilter,
    paginationOptions: { page_number: number; page_size: number },
    options?: IAsyncOptions,
) => {
    const requestBody = {
        type: 'Work.WeeklyReportList',
        body: {
            ...filter,
            ...paginationOptions,
        },
    };
    const actionTypes = {
        request: getWeeklyReportListRequest,
        success: getWeeklyReportListSuccess,
        failure: getWeeklyReportListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getWeeklyReportElement = (Id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Work.WeeklyReportGet',
        body: {
            Id: Id,
        },
    };
    const actionTypes = {
        request: getWeeklyReportElementRequest,
        success: getWeeklyReportElementSuccess,
        failure: getWeeklyReportElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const addWeeklyReportElement = (WorkerId: string, Date: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Work.WeeklyReportAdd',
        body: {
            WorkerId: WorkerId,
            Date: Date,
        },
    };
    const actionTypes = {
        request: addWeeklyReportElementRequest,
        success: addWeeklyReportElementSuccess,
        failure: addWeeklyReportElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const addWeeklyReportState = (body: IWeeklyReportStateBody, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Work.AddWeeklyReportState',
        body: body,
    };
    const actionTypes = {
        request: addWeeklyReportStateRequest,
        success: addWeeklyReportStateSuccess,
        failure: addWeeklyReportStateFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getWorkerData = (id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.Get',
        body: {
            id: id,
        },
    };
    const actionTypes = {
        request: getWorkerDataRequest,
        success: getWorkerDataSuccess,
        failure: getWorkerDataFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
