import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import {
    emptySDRPlanData,
    ISDRPlanData,
    prepareSDRPlanData,
    ISDRPlanTasksData,
    prepareSDRPlanTasksData,
    ISDRPlanGanttData,
    prepareSDRPlanGanttData,
} from '@pages/SDRPlan/methods';
import { IUserData } from '@helpers/authHelper';
import { sortArrayByProp } from '@helpers/methods';

interface ISDRPlanSlice {
    isLoading: boolean;
    sdrPlan: ISDRPlanData;
    isLoadingTasks: boolean;
    sdrPlanTasks: ISDRPlanTasksData[];
    sdrPlanGantt: ISDRPlanGanttData[];
}

const initialState: ISDRPlanSlice = {
    isLoading: false,
    sdrPlan: emptySDRPlanData,
    isLoadingTasks: false,
    sdrPlanTasks: [],
    sdrPlanGantt: [],
};

const sdrPlanSlice = createSlice({
    name: 'sdrPlan',
    initialState,
    reducers: {
        resetSDRPlan: (state: ISDRPlanSlice, action: PayloadAction<any>) => {
            state.sdrPlan = {
                ...emptySDRPlanData,
            };
        },

        getSDRPlanRequest: (state: ISDRPlanSlice) => {
            state.isLoading = true;
        },
        getSDRPlanSuccess: (state: ISDRPlanSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.sdrPlan = prepareSDRPlanData(action.payload?.result);
        },
        getSDRPlanFailure: (state: ISDRPlanSlice) => {
            state.isLoading = false;
        },

        //////

        editSDRPlanRequest: (state: ISDRPlanSlice) => {
            // state.isLoading = true;
        },
        editSDRPlanSuccess: (state: ISDRPlanSlice) => {
            state.isLoading = false;
        },
        editSDRPlanFailure: (state: ISDRPlanSlice) => {
            state.isLoading = false;
        },

        //////

        getSDRPlanTasksRequest: (state: ISDRPlanSlice) => {
            state.isLoadingTasks = true;
        },
        getSDRPlanTasksSuccess: (state: ISDRPlanSlice, action: PayloadAction<any>) => {
            const sdrPlanTasks = prepareSDRPlanTasksData(action.payload?.result?.rows);
            const sdrPlanGantt = prepareSDRPlanGanttData(sdrPlanTasks);
            state.isLoadingTasks = false;
            state.sdrPlanTasks = sdrPlanTasks;
            state.sdrPlanGantt = sdrPlanGantt;
        },
        getSDRPlanTasksFailure: (state: ISDRPlanSlice) => {
            state.isLoadingTasks = false;
            state.sdrPlanTasks = [];
        },
    },
});

const { reducer, actions } = sdrPlanSlice;

export const {
    resetSDRPlan,

    getSDRPlanRequest,
    getSDRPlanSuccess,
    getSDRPlanFailure,

    editSDRPlanRequest,
    editSDRPlanSuccess,
    editSDRPlanFailure,

    getSDRPlanTasksRequest,
    getSDRPlanTasksSuccess,
    getSDRPlanTasksFailure,
} = actions;

export const sdrPlanSelector = (state: RootState) => {
    const { isLoading, sdrPlan, isLoadingTasks, sdrPlanTasks, sdrPlanGantt } = state.sdrPlan;
    return {
        isLoading,
        sdrPlan,
        isLoadingTasks,
        sdrPlanTasks,
        sdrPlanGantt,
    };
};

export const getSDRPlan = (SDRPlanId: string, user: IUserData | null, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.ProjectGet',
        body: {
            Id: SDRPlanId,
        },
    };
    const actionTypes = {
        request: getSDRPlanRequest,
        success: getSDRPlanSuccess,
        failure: getSDRPlanFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editSDRPlan = (sdrPlanId: string | null | undefined, sdrPlanNewFields: any, user: IUserData | null, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.Edit',
        body: {
            Id: sdrPlanId || null,
            UserId: user?.UserId,
            ...sdrPlanNewFields,
        },
    };
    const actionTypes = {
        request: editSDRPlanRequest,
        success: editSDRPlanSuccess,
        failure: editSDRPlanFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getSDRPlanTasks = (ProjectId: string, user: IUserData | null, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.List',
        body: {
            ProjectId,
            page_number: 1,
            page_size: 500,
        },
    };
    const actionTypes = {
        request: getSDRPlanTasksRequest,
        success: getSDRPlanTasksSuccess,
        failure: getSDRPlanTasksFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
