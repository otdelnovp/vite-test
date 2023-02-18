import { IUserData } from '@helpers/authHelper';
import moment from 'moment';

export interface IExecutionTimeElement {
    Id: string;
    Comment: string;
    Time: number;
    Date: string;
    TaskId: string;
    TaskName: string;
    TaskNumber: string;
}

interface IWeekDay {
    Date: string;
    Time: number;
    ExecutionTimes: IExecutionTimeElement[];
}

export interface ITableElement {
    TaskId: string;
    TaskName: string;
    TaskNumber: string;
    Time: number;
    Type: 'task' | 'workException';
    BgColor?: string;
    Weekdays: IWeekDay[];
}

export const initTableElement: ITableElement = {
    TaskId: '',
    TaskName: '',
    TaskNumber: '',
    Time: 0,
    Type: 'task',
    Weekdays: [],
};

export interface IWorkExceptionTimeElement {
    Date: string;
    Time: number;
    WorkExceptionCode: string;
    WorkExceptionColorCode: string;
    WorkExceptionTypeId: string;
    WorkExceptionTypeName: string;
}

interface IWorkExceptionItem {
    WorkExceptionTypeId: string;
    WorkExceptionTypeName: string;
    WorkExceptionColorCode: string;
}

export interface ISelectedDay {
    taskId: string;
    taskName: string;
    date: string;
    executionTimeList: IExecutionTimeElement[];
}

export const getMonday = (date: string) => {
    let newDate = new Date(date);
    let day = newDate.getDay(),
        diff = newDate.getDate() - day + (day == 0 ? -6 : 1);
    return moment(new Date(newDate.setDate(diff))).format('YYYY-MM-DD');
};

export const getWeekArray = (dateInWeek: string) => {
    let weekArray = [];
    let newDate = new Date(dateInWeek);
    let day = newDate.getDay(),
        diff = newDate.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    const monday = new Date(newDate.setDate(diff));
    for (let i = 0; i < 7; i++) {
        var nextDate = new Date(monday);
        nextDate.setDate(monday.getDate() + i);
        weekArray.push(nextDate);
    }
    return weekArray;
};

const getTaskArray = (executionTimeList: IExecutionTimeElement[]) => {
    let taskArray: { TaskId: string; TaskName: string; TaskNumber: string }[] = [];
    executionTimeList &&
        executionTimeList.forEach((task) => {
            const foundItem = taskArray.find((item) => item.TaskId === task.TaskId);
            if (!foundItem) {
                taskArray.push({ TaskId: task.TaskId, TaskName: task.TaskName, TaskNumber: task.TaskNumber });
            }
        });
    return taskArray;
};

const getWorkExceptionArray = (workExceptionTimeList: IWorkExceptionTimeElement[]) => {
    let workExceptionArray: IWorkExceptionItem[] = [];
    workExceptionTimeList &&
        workExceptionTimeList.forEach((task) => {
            const foundItem = workExceptionArray.find((item) => item.WorkExceptionTypeId === task.WorkExceptionTypeId);
            if (!foundItem) {
                workExceptionArray.push({
                    WorkExceptionTypeId: task.WorkExceptionTypeId,
                    WorkExceptionTypeName: task.WorkExceptionTypeName,
                    WorkExceptionColorCode: task.WorkExceptionColorCode,
                });
            }
        });
    return workExceptionArray;
};

export const prepareTableData = (
    user: IUserData | null,
    weekDate: string,
    executionTimeList: IExecutionTimeElement[],
    workExceptionTimeList: IWorkExceptionTimeElement[],
): ITableElement[] => {
    const weekArray = getWeekArray(weekDate);
    const taskArray = getTaskArray(executionTimeList);
    const workExceptionArray = getWorkExceptionArray(workExceptionTimeList);

    let tableData: ITableElement[] = [];
    workExceptionArray &&
        workExceptionArray.forEach((workException) => {
            let weekDays: IWeekDay[] = [];
            let workExceptionTime = 0;
            weekArray.forEach((weekDay) => {
                let time = 0;
                const weTimes = workExceptionTimeList.filter(
                    (weTime) =>
                        weTime.WorkExceptionTypeId === workException.WorkExceptionTypeId &&
                        weTime.Date.substring(0, 10) === moment(weekDay).format('YYYY-MM-DD'),
                );
                weTimes &&
                    weTimes.forEach((weTime) => {
                        time = time + weTime.Time;
                    });
                workExceptionTime = workExceptionTime + time;
                weekDays.push({
                    Date: moment(weekDay).format('YYYY-MM-DD'),
                    Time: time,
                    ExecutionTimes: [],
                });
            });
            tableData.push({
                TaskId: workException.WorkExceptionTypeId,
                TaskName: workException.WorkExceptionTypeName,
                TaskNumber: '',
                Time: workExceptionTime,
                Type: 'workException',
                BgColor: `#${workException.WorkExceptionColorCode}`,
                Weekdays: [...weekDays],
            });
        });

    taskArray &&
        taskArray.forEach((task) => {
            let weekDays: IWeekDay[] = [];
            let taskTime = 0;
            weekArray.forEach((weekDay) => {
                let time = 0;
                const exTimes = executionTimeList.filter(
                    (exTime) => exTime.TaskId === task.TaskId && exTime.Date.substring(0, 10) === moment(weekDay).format('YYYY-MM-DD'),
                );
                exTimes &&
                    exTimes.forEach((exTime) => {
                        time = time + exTime.Time;
                    });
                taskTime = taskTime + time;
                weekDays.push({
                    Date: moment(weekDay).format('YYYY-MM-DD'),
                    Time: time,
                    ExecutionTimes: [...exTimes],
                });
            });
            tableData.push({
                TaskId: task.TaskId,
                TaskName: task.TaskName,
                TaskNumber: task.TaskNumber,
                Time: taskTime,
                Type: 'task',
                Weekdays: [...weekDays],
            });
        });

    return tableData;
};

export const taskRowHasTime = (taskRow: any) => {
    let hasTime = false;
    taskRow.Weekdays.forEach((weekDay: any) => {
        if (weekDay.Time) {
            hasTime = true;
        }
    });
    return hasTime;
};
