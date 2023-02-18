import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import { dateToServerTimestamp } from '@helpers/dateHelper';

import { IWorkedTime, IWorkedTimeFilter, prepareWorkedTime } from '@pages/WorkedTime/methods';

interface IWorkedTimeSlice {
    isLoading: boolean;
    isLoadingSet: boolean;
    workedTime: IWorkedTime[];
}

const initialState: IWorkedTimeSlice = {
    isLoading: false,
    isLoadingSet: false,
    workedTime: [],
};

const workedTimeSlice = createSlice({
    name: 'workedTime',
    initialState,
    reducers: {
        getWorkedTimeRequest: (state: IWorkedTimeSlice, action: PayloadAction<any>) => {
            if (!action.payload.withoutLoader) {
                state.isLoading = true;
                state.workedTime = [];
            }
        },
        getWorkedTimeSuccess: (state: IWorkedTimeSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            const preparedWorkedTime = prepareWorkedTime(action.payload?.result);
            state.workedTime = preparedWorkedTime;
        },
        getWorkedTimeFailure: (state: IWorkedTimeSlice) => {
            state.isLoading = false;
        },

        setWorkedTimeRequest: (state: IWorkedTimeSlice, action: PayloadAction<any>) => {
            const changedDate = action.payload.changedDate;
            if (changedDate) {
                const newWorkedTime = state.workedTime.map((dept) => {
                    if (dept.Users) {
                        const newUsers = dept.Users.map((user) => {
                            if (user.UserId === changedDate.UserInfo.UserId && user.Dates) {
                                let newDates = [];
                                let userTime = 0;
                                if (user.Dates.find((date) => date.Date === changedDate.Date)) {
                                    // существующая дата
                                    newDates = user.Dates.map((date) => {
                                        if (date.Date === changedDate.Date) {
                                            userTime = userTime + changedDate.Time;
                                            return { ...date, Time: changedDate.Time, ExecutionTimes: [...changedDate.ExecutionTimes] };
                                        }
                                        userTime = userTime + date.Time;
                                        return date;
                                    });
                                } else {
                                    // новая дата
                                    user.Dates.forEach((date) => {
                                        userTime = userTime + date.Time;
                                    });
                                    userTime = userTime + changedDate.Time;
                                    newDates = [...user.Dates, { ...changedDate }];
                                }
                                return { ...user, Time: userTime, Dates: newDates };
                            } else if (user.UserId === changedDate.UserInfo.UserId && !user.Dates) {
                                // у пользователя вообще не было дат
                                let newDates = [{ ...changedDate }];
                                return { ...user, Time: changedDate.Time, Dates: newDates };
                            }
                            return user;
                        });
                        return { ...dept, Users: newUsers };
                    }
                    return dept;
                });
                // state.isLoading = true;
                state.workedTime = newWorkedTime;
            }
        },

        // setWorkExceptionDayRequest: (state: IWorkExceptionSlice) => {
        //     state.isLoadingSet = true;
        // },
        // setWorkExceptionDaySuccess: (state: IWorkExceptionSlice) => {
        //     state.isLoadingSet = false;
        // },
        // setWorkExceptionDayFailure: (state: IWorkExceptionSlice) => {
        //     state.isLoadingSet = false;
        // },
    },
});

const { reducer, actions } = workedTimeSlice;

export const {
    getWorkedTimeRequest,
    getWorkedTimeSuccess,
    getWorkedTimeFailure,
    setWorkedTimeRequest,
    // setWorkExceptionDayRequest,
    // setWorkExceptionDaySuccess,
    // setWorkExceptionDayFailure,
} = actions;

export const workedTimeSelector = (state: RootState) => {
    const { isLoading, isLoadingSet, workedTime } = state.workedTime;
    return { isLoading, isLoadingSet, workedTime };
};

export const getWorkedTime = (filter: IWorkedTimeFilter, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ExecutionTimeReport',
        body: {
            CompanyId: filter.CompanyId,
            DepartmentId: filter.DepartmentId,
            DateFrom: `${filter.Year}-${filter.Month}-01`,
            DateTo: `${filter.Year}-${filter.Month}-${new Date(parseInt(filter.Year), parseInt(filter.Month), 0).getDate()}`,
        },
    };
    const actionTypes = {
        request: getWorkedTimeRequest,
        success: getWorkedTimeSuccess,
        failure: getWorkedTimeFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

// export const setWorkExceptionDay = (interval: IWorkExceptionInterval, options?: IAsyncOptions) => {
//     const requestBody = {
//         type: 'Work.ExceptionEdit',
//         body: {
//             UserId: interval.UserInfo.UserId,
//             DateFrom: interval.DateFrom,
//             DateTo: interval.DateTo,
//             WorkExceptionTypeId: interval.WorkExceptionTypeId,
//         },
//     };
//     const actionTypes = {
//         request: setWorkExceptionDayRequest,
//         success: setWorkExceptionDaySuccess,
//         failure: setWorkExceptionDayFailure,
//     };
//     return asyncRequestAction(requestBody, actionTypes, options);
// };

export default reducer;

