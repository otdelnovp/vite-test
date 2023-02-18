import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { IUserData, prepareUserData } from '@helpers/authHelper';
import { addWidgetToUpdateQueue, removeWidgetFromUpdateQueue } from '@helpers/dashboardHelper';
import { Moment } from 'moment';
import { testData_ordersByStateThisMonth } from '@pages/Dashboard/testData_ordersByStateThisMonth';
import { momentToFormatDateString } from '@helpers/dateHelper';
import { getDatesForRequest, mapOrdersTotalByStates } from '@pages/Dashboard/methods';
import { testData_ordersByStateOneWeek } from '@pages/Dashboard/testData_ordersByStateOneWeek';
import { testData_ordersByPriorityOneWeek } from '@pages/Dashboard/testData_ordersByPriorityOneWeek';
import { testData_ordersByType } from '@pages/Dashboard/testdata_ordersByType';

interface IDashboardSlice {
    loadingWidgets: any[];
    updateLayoutNames: any[];
    isLoading: boolean;
    initHomePage: boolean;
    ordersByStateMonth: any[];
    ordersByStateOneWeek: any[];
    ordersByPriorityOneWeek: any[];
    ordersByType: any[];
    ordersByStateOneDayByCreatedTotal: number;
    ordersByStateOneDayTotal: number;
}

const initialState: IDashboardSlice = {
    loadingWidgets: [],
    updateLayoutNames: [],
    isLoading: false,
    initHomePage: false,
    ordersByStateMonth: [],
    ordersByStateOneWeek: [],
    ordersByPriorityOneWeek: [],
    ordersByType: [],
    ordersByStateOneDayByCreatedTotal: 0,
    ordersByStateOneDayTotal: 0,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        // Orders by STATE this MONTH:
        getOrdersByStateMonthRequest: (state, action: PayloadAction<any>) => {
            state.loadingWidgets = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
        },
        getOrdersByStateMonthSuccess: (state, action: PayloadAction<any>) => {
            // const pieResponseBody =
            //     action.payload.body && action.payload.body.Total && action.payload.body.Total.length > 0 ? action.payload.body.Total : [];
            // state.ordersTotal = pieResponseBody;

            state.ordersByStateMonth = testData_ordersByStateThisMonth.body.Total;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByStateMonth');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByStateMonth');
        },
        getOrdersByStateMonthFailure: (state, action: PayloadAction<any>) => {
            // state.ordersTotal = [];
            state.ordersByStateMonth = testData_ordersByStateThisMonth.body.Total;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByStateMonth');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByStateMonth');
        },

        // Orders by STATE one WEEK:
        getOrdersByStateOneWeekRequest: (state, action: PayloadAction<any>) => {
            state.loadingWidgets = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
        },
        getOrdersByStateOneWeekSuccess: (state, action: PayloadAction<any>) => {
            const weekPriorityPercentData =
                action.payload && action.payload.body && action.payload.body.ByDate && action.payload.body.ByDate.length > 0
                    ? action.payload.body.ByDate
                    : [];
            state.ordersByStateOneWeek = weekPriorityPercentData && weekPriorityPercentData.length > 0 ? weekPriorityPercentData : [];
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'PercentOrdersByStateOneWeekContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'PercentOrdersByStateOneWeekContainer');
        },
        getOrdersByStateOneWeekFailure: (state, action: PayloadAction<any>) => {
            // state.ordersSevenDaysAgo = [];
            state.ordersByStateOneWeek = testData_ordersByStateOneWeek.body.ByDate;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'PercentOrdersByStateOneWeekContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'PercentOrdersByStateOneWeekContainer');
        },

        // Orders by PRIORITY ONE WEEK
        getOrdersByPriorityOneWeekRequest: (state, action: PayloadAction<any>) => {
            state.loadingWidgets = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
        },

        getOrdersByPriorityOneWeekSuccess: (state, action: PayloadAction<any>) => {
            const weekPriorityData =
                action.payload && action.payload.body && action.payload.body.ByDate && action.payload.body.ByDate.length > 0
                    ? action.payload.body.ByDate
                    : [];
            state.ordersByPriorityOneWeek = weekPriorityData;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByPriorityOneWeekContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByPriorityOneWeekContainer');
        },

        getOrdersByPriorityOneWeekFailure: (state, action: PayloadAction<any>) => {
            // state.ordersByPriorityOneWeek = [];
            state.ordersByPriorityOneWeek = testData_ordersByPriorityOneWeek.body.ByDate;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByPriorityOneWeekContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByPriorityOneWeekContainer');
        },

        // Orders by STATE ONE DAT by CREATED
        getOrdersByStateOneDayByCreatedRequest: (state, action: PayloadAction<any>) => {
            const newOrdersAdd = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
            state.ordersByStateOneDayByCreatedTotal = 0;
            state.loadingWidgets = newOrdersAdd;
        },
        getOrdersByStateOneDayByCreatedSuccess: (state, action: PayloadAction<any>) => {
            const newTodayTotals =
                action.payload.body && action.payload.body.Total && action.payload.body.Total.length > 0 ? action.payload.body.Total : [];
            const updateNewOrders = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersCrearedTodayContainer');
            const removeLoadingNewOrders = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersCrearedTodayContainer');
            state.ordersByStateOneDayTotal = mapOrdersTotalByStates(newTodayTotals, false);
            state.updateLayoutNames = updateNewOrders;
            state.loadingWidgets = removeLoadingNewOrders;
        },
        getOrdersByStateOneDayByCreatedFailure: (state, action: PayloadAction<any>) => {
            // state.ordersByStateOneDayTotal = 0;
            state.ordersByStateOneDayByCreatedTotal = 420;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersNewTodayContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersNewTodayContainer');
        },

        // Orders by STATE one DAY
        getOrdersByStateOneDayRequest: (state, action: PayloadAction<any>) => {
            state.ordersByStateOneDayTotal = 0;
            state.loadingWidgets = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
        },
        getOrdersByStateOneDaySuccess: (state, action: PayloadAction<any>) => {
            const stateTodayTotals =
                action.payload.body && action.payload.body.Total && action.payload.body.Total.length > 0 ? action.payload.body.Total : [];
            state.ordersByStateOneDayTotal = mapOrdersTotalByStates(stateTodayTotals, ['RD', 'PL']);
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersTotalNumberContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersTotalNumberContainer');
        },
        getOrdersByStateOneDayFailure: (state, action: PayloadAction<any>) => {
            // state.ordersByStateOneDayTotal = 0;
            state.ordersByStateOneDayTotal = 69;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersTotalNumberContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersTotalNumberContainer');
        },

        // case GET_ORDERS_TABLE_REQUEST:
        getOrdersByTypeRequest: (state, action: PayloadAction<any>) => {
            const ordersTableAdd = addWidgetToUpdateQueue(state.loadingWidgets, action.payload.widgetName);
            state.loadingWidgets = ordersTableAdd;
        },

        // case GET_ORDERS_TABLE_SUCCESS:
        getOrdersByTypeSuccess: (state, action: PayloadAction<any>) => {
            const tableTotalData =
                action.payload && action.payload.body && action.payload.body.Total && action.payload.body.Total.length > 0
                    ? action.payload.body.Total
                    : [];
            const updateOrdersTable = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByTypeContainer');
            const removeOrdersTable = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByTypeContainer');
            state.ordersByType = tableTotalData;
            state.updateLayoutNames = updateOrdersTable;
            state.loadingWidgets = removeOrdersTable;
        },

        // case GET_ORDERS_TABLE_FAILURE:
        getOrdersByTypeFailure: (state, action: PayloadAction<any>) => {
            // state.ordersByType = [];
            state.ordersByType = testData_ordersByType.body.Total;
            state.updateLayoutNames = addWidgetToUpdateQueue(state.updateLayoutNames, 'OrdersByTypeContainer');
            state.loadingWidgets = removeWidgetFromUpdateQueue(state.loadingWidgets, 'OrdersByTypeContainer');
        },
    },
});

const { reducer, actions } = dashboardSlice;

export const {
    getOrdersByStateMonthRequest,
    getOrdersByStateMonthSuccess,
    getOrdersByStateMonthFailure,

    getOrdersByStateOneWeekRequest,
    getOrdersByStateOneWeekSuccess,
    getOrdersByStateOneWeekFailure,

    getOrdersByStateOneDayByCreatedRequest,
    getOrdersByStateOneDayByCreatedSuccess,
    getOrdersByStateOneDayByCreatedFailure,

    getOrdersByStateOneDayRequest,
    getOrdersByStateOneDaySuccess,
    getOrdersByStateOneDayFailure,

    getOrdersByPriorityOneWeekRequest,
    getOrdersByPriorityOneWeekSuccess,
    getOrdersByPriorityOneWeekFailure,

    getOrdersByTypeRequest,
    getOrdersByTypeSuccess,
    getOrdersByTypeFailure,
} = actions;

export const dashboardSelector = (state: RootState) => {
    const {
        ordersByStateMonth,
        ordersByStateOneWeek,
        ordersByPriorityOneWeek,
        ordersByStateOneDayByCreatedTotal,
        ordersByStateOneDayTotal,
        ordersByType,
        loadingWidgets,
        updateLayoutNames,
        isLoading,
        initHomePage,
    } = state.dashboard;
    return {
        ordersByStateMonth,
        ordersByStateOneWeek,
        ordersByPriorityOneWeek,
        ordersByStateOneDayByCreatedTotal,
        ordersByStateOneDayTotal,
        ordersByType,
        loadingWidgets,
        updateLayoutNames,
        isLoading,
        initHomePage,
    };
};

// количество заявок с начала месяца
export const getOrdersByStateMonth = (user: any, options?: IAsyncOptions) => {
    const { startOfMonth, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderState',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(startOfMonth),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: false,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByStateMonthRequest,
        success: getOrdersByStateMonthSuccess,
        failure: getOrdersByStateMonthFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// Процент выполнения заявок за неделю
export const getOrdersByStateOneWeek = (user: any, options?: IAsyncOptions) => {
    const { oneWeekAgo, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderState',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(oneWeekAgo),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: false,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByStateOneWeekRequest,
        success: getOrdersByStateOneWeekSuccess,
        failure: getOrdersByStateOneWeekFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// Процент выполнения заявок за день
export const getOrdersByStateOneDayByCreatedTotal = (user: any, options?: IAsyncOptions) => {
    const { startOfDay, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderState',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(startOfDay),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: true,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByStateOneDayByCreatedRequest,
        success: getOrdersByStateOneDayByCreatedSuccess,
        failure: getOrdersByStateOneDayByCreatedFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// Зарегистрировано и выполнено сегодня
export const getOrdersByStateOneDayTotal = (user: any, options?: IAsyncOptions) => {
    const { startOfDay, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderState',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(startOfDay),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: false,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByStateOneDayRequest,
        success: getOrdersByStateOneDaySuccess,
        failure: getOrdersByStateOneDayFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// Заявки по приоритетам за неделю
export const getOrdersByPriorityOneWeek = (user: any, options?: IAsyncOptions) => {
    const { oneWeekAgo, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderPriority',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(oneWeekAgo),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: false,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByPriorityOneWeekRequest,
        success: getOrdersByPriorityOneWeekSuccess,
        failure: getOrdersByPriorityOneWeekFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getOrdersByType = (user: any, options?: IAsyncOptions) => {
    const { startOfMonth, endOfDay } = getDatesForRequest();
    const requestBody = {
        type: 'Reports.ByOrderPriority',
        body: {
            RightsOfUserId: user && user.UserId,
            DateFrom: momentToFormatDateString(startOfMonth),
            DateTo: momentToFormatDateString(endOfDay),
            ByCreateDate: false,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getOrdersByTypeRequest,
        success: getOrdersByTypeSuccess,
        failure: getOrdersByTypeFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
