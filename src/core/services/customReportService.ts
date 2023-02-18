import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';

import { IWeeklyReportElement } from '@pages/WeeklyReport/model';
import { IWeeklyReportColumnElement } from '@pages/WeeklyReport/columns';
import { IWeeklyReportListFilter } from '@pages/WeeklyReport/WeeklyReportListFilter/model';
import { IWeeklyReportStateBody } from '@helpers/weeklyReportHelper';
import { IUserElement } from '@pages/Dictionary/User/model';
import { ICustomReportElement, ICustomReportListElement } from '@pages/CustomReport/model';
import { customReport_Get, customReport_List, customReport_Report } from '@pages/CustomReport/testData/testData_CustomReport';

interface ICustomReportSlice {
    isLoading: boolean;
    customReportList: ICustomReportListElement[];
    rowCount: number;
    customReportElement: ICustomReportElement;
    customReportData: any[];
}

const initialState: ICustomReportSlice = {
    isLoading: false,
    customReportList: [],
    rowCount: 0,
    customReportElement: {} as ICustomReportElement,
    customReportData: [],
};

const customReportSlice = createSlice({
    name: 'customReportTime',
    initialState,
    reducers: {
        // LIST
        getCustomReportListRequest: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.customReportList = [];
        },
        getCustomReportListSuccess: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.rowCount = action.payload?.result.row_count;
            // state.customReportList = customReport_List;
        },
        getCustomReportListFailure: (state: ICustomReportSlice) => {
            state.isLoading = false;
            state.customReportList = [...customReport_List];
        },

        // GET ELEMENT
        getCustomReportElementRequest: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.customReportElement = {} as ICustomReportElement;
        },
        getCustomReportElementSuccess: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            // state.customReportElement = { ...action.payload?.result };
        },
        getCustomReportElementFailure: (state: ICustomReportSlice) => {
            state.isLoading = false;
            state.customReportElement = { ...customReport_Get };
        },

        // CLEAR ELEMENT
        clearCustomReportElement: (state) => {
            state.customReportElement = {} as ICustomReportElement;
        },

        // ADD ELEMENT
        setCustomReportElementRequest: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
        },
        setCustomReportElementSuccess: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
        },
        setCustomReportElementFailure: (state: ICustomReportSlice) => {
            state.isLoading = false;
        },

        // GET REPORT DATA
        getCustomReportDataRequest: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.customReportData = [];
        },
        getCustomReportDataSuccess: (state: ICustomReportSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            // state.customReportData = [ ...action.payload?.result ];
        },
        getCustomReportDataFailure: (state: ICustomReportSlice) => {
            state.isLoading = false;
            state.customReportData = [...customReport_Report];
        },
    },
});

const { reducer, actions } = customReportSlice;

export const {
    getCustomReportListRequest,
    getCustomReportListSuccess,
    getCustomReportListFailure,

    getCustomReportElementRequest,
    getCustomReportElementSuccess,
    getCustomReportElementFailure,

    clearCustomReportElement,

    setCustomReportElementRequest,
    setCustomReportElementSuccess,
    setCustomReportElementFailure,

    getCustomReportDataRequest,
    getCustomReportDataSuccess,
    getCustomReportDataFailure,
} = actions;

export const customReportListSelector = (state: RootState) => {
    const { isLoading, customReportList, rowCount } = state.customReport;
    return { isLoading, customReportList, rowCount };
};

export const customReportElementSelector = (state: RootState) => {
    const { isLoading, customReportElement } = state.customReport;
    return { isLoading, customReportElement };
};

export const customReportDataSelector = (state: RootState) => {
    const { isLoading, customReportData } = state.customReport;
    return { isLoading, customReportData };
};

export const getCustomReportList = (options?: IAsyncOptions) => {
    const requestBody = {
        type: 'CustomReport.List',
        body: null,
    };
    const actionTypes = {
        request: getCustomReportListRequest,
        success: getCustomReportListSuccess,
        failure: getCustomReportListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getCustomReportElement = (id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'CustomReport.Get',
        body: {
            id: id,
        },
    };
    const actionTypes = {
        request: getCustomReportElementRequest,
        success: getCustomReportElementSuccess,
        failure: getCustomReportElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const setCustomReportElement = (customReportElement: ICustomReportElement, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'CustomReport.Set',
        body: {
            ...customReportElement,
        },
    };
    const actionTypes = {
        request: setCustomReportElementRequest,
        success: setCustomReportElementSuccess,
        failure: setCustomReportElementFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getCustomReportData = (id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'CustomReport.Report',
        body: {
            id: id,
        },
    };
    const actionTypes = {
        request: getCustomReportDataRequest,
        success: getCustomReportDataSuccess,
        failure: getCustomReportDataFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
