import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { dateToServerTimestamp } from '@helpers/dateHelper';

import { ICalendarProductionDay, ICalendarProductionFilter, prepareCalendarProduction } from '@pages/CalendarProduction/methods';

interface ICalendarProductionSlice {
    isLoading: boolean;
    isLoadingSet: boolean;
    calendarProduction: ICalendarProductionDay[][];
}

const initialState: ICalendarProductionSlice = {
    isLoading: true,
    isLoadingSet: false,
    calendarProduction: [],
};

const calendarProductionSlice = createSlice({
    name: 'calendarProduction',
    initialState,
    reducers: {
        getCalendarRequest: (state: ICalendarProductionSlice, action: PayloadAction<any>) => {
            if (!action.payload.withoutLoader) {
                state.isLoading = true;
                state.calendarProduction = [];
            }
        },
        getCalendarSuccess: (state: ICalendarProductionSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.calendarProduction = prepareCalendarProduction(action.payload?.result);
        },
        getCalendarFailure: (state: ICalendarProductionSlice) => {
            state.isLoading = false;
            state.calendarProduction = [];
        },

        setCalendarDayRequest: (state: ICalendarProductionSlice) => {
            state.isLoadingSet = true;
        },
        setCalendarDaySuccess: (state: ICalendarProductionSlice) => {
            state.isLoadingSet = false;
        },
        setCalendarDayFailure: (state: ICalendarProductionSlice) => {
            state.isLoadingSet = false;
        },
    },
});

const { reducer, actions } = calendarProductionSlice;

export const { getCalendarRequest, getCalendarSuccess, getCalendarFailure, setCalendarDayRequest, setCalendarDaySuccess, setCalendarDayFailure } =
    actions;

export const calendarProductionSelector = (state: RootState) => {
    const { isLoading, isLoadingSet, calendarProduction } = state.calendarProduction;
    return { isLoading, isLoadingSet, calendarProduction };
};

export const getCalendar = (filter: ICalendarProductionFilter, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Calendar.Get',
        body: {
            CompanyId: filter.CompanyId,
            DateFrom: `${filter.Year}-01-01`,
        },
    };
    const actionTypes = {
        request: getCalendarRequest,
        success: getCalendarSuccess,
        failure: getCalendarFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const setCalendarDay = (CompanyId: string | null, newDay: ICalendarProductionDay, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Calendar.Set',
        body: [
            {
                CompanyId,
                Date: dateToServerTimestamp(newDay.Date),
                DayType: newDay.DayType,
            },
        ],
    };
    const actionTypes = {
        request: setCalendarDayRequest,
        success: setCalendarDaySuccess,
        failure: setCalendarDayFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
