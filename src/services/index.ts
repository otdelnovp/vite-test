import { combineReducers, Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import dictionaryReducer from '@services/dictionaryService';
import dictionaryEditReducer from '@services/dictionaryEditService';
import alertReducer from '@services/alertService';
import userReducer from '@services/userService';
import lkReducer from '@services/lkService';
import fileReducer from '@services/fileService';
import taskReducer from '@services/taskService';
import sdrPlanReducer from '@services/sdrPlanService';
import calendarProductionReducer from '@services/calendarProductionService';
import workExceptionReducer from '@services/workExceptionService';
import workedTimeReducer from '@services/workedTimeService';
import weeklyReportReducer from '@services/weeklyReportService';
import dashboardReducer from '@services/dashboardService';
import customReportReducer from '@services/customReportService';

export const rootReducer = combineReducers({
    dictionary: dictionaryReducer,
    dictionaryEdit: dictionaryEditReducer,
    alert: alertReducer,
    user: userReducer,
    lk: lkReducer,
    file: fileReducer,
    task: taskReducer,
    sdrPlan: sdrPlanReducer,
    calendarProduction: calendarProductionReducer,
    workException: workExceptionReducer,
    workedTime: workedTimeReducer,
    weeklyReport: weeklyReportReducer,
    dashboard: dashboardReducer,
    customReport: customReportReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
