import { currentYear, currentMonth } from '@helpers/dateHelper';
import { sortArrayByProp } from '@helpers/methods';
import { createRequest } from '@services/dispatcher';

export interface IWorkedTimeUserInfo {
    UserId: string;
    UserName: string;
    DepartmentName: string;
}

export interface IWorkedTimeSelectedDate {
    Date: string;
    Time: number;
    ExecutionTimes: IExecutionTime[];
    UserInfo: IWorkedTimeUserInfo;
    DepartmentId: string;
    DepartmentName: string;
}

export interface IExecutionTime {
    Id: string;
    Comment: string;
    Time: number;
    TaskId: string;
    TaskTitle: string;
    TaskNumber: string;
}

export interface IWorkedTimeDate {
    Date: string;
    Time: number;
    ExecutionTimes: IExecutionTime[];
}

export interface IWorkedTimeWeeklyReport {
    Date: string;
    State: 'D' | 'R' | 'A' | 'N';
    WeeklyReportId: string;
}

export interface IWorkedTimeUser {
    UserId: string;
    LastName: string;
    FirstName: string;
    Time: number;
    Dates: IWorkedTimeDate[] | null;
    WeeklyReports: IWorkedTimeWeeklyReport[] | null;
}

export interface IWorkedTime {
    DepartmentId: string;
    DepartmentName: string;
    ParentId: string;
    Users: IWorkedTimeUser[] | null;
}

export interface IWorkedTimeFilter {
    Year: string;
    Month: string;
    CompanyId: string | null;
    CompanyName: string | null;
    DepartmentId: string | null;
    DepartmentName: string | null;
}

export const workedTimeFilterInit: IWorkedTimeFilter = {
    Year: currentYear.toString(),
    Month: currentMonth.toString(),
    CompanyId: null,
    CompanyName: null,
    DepartmentId: null,
    DepartmentName: null,
};

export const prepareWorkedTime = (workedTime: IWorkedTime[]) => {
    if (!workedTime) return [];
    return sortArrayByProp(
        workedTime.filter((item) => item.Users?.length).map((item) => ({ ...item, Users: sortArrayByProp(item.Users, 'LastName') })),
        'DepartmentName',
    );
};

export const defaultWorkedTimeTask: IExecutionTime = {
    Id: '',
    Comment: '',
    Time: 0,
    TaskId: '',
    TaskTitle: '',
    TaskNumber: '',
};

interface IExecutionTimeEdit {
    (setIsLoading: (isLoading: boolean) => void, userId: string, date: string, taskData: IExecutionTime): Promise<string>;
}

export const executionTimeEdit: IExecutionTimeEdit = async (setIsLoading, userId, date, taskData) => {
    setIsLoading(true);
    let newBody = {
        Id: taskData.Id ? taskData.Id : null,
        Date: date,
        UserId: userId,
        TaskId: taskData.TaskId,
        Time: taskData.Time ? taskData.Time.toString() : taskData.Time,
        Comment: taskData.Comment,
    };
    const params = {
        type: 'Task.ExecutionTimeEdit',
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    if (error) {
        throw new Error(JSON.stringify(error));
    } else {
        console.log('no error', postData);
        if (!taskData.Id) {
            setIsLoading(false);
            // @ts-ignore
            return postData.data.body.Created;
        }
    }
    setIsLoading(false);
    return taskData.Id;
};

interface IExecutionTimeDelete {
    (setIsLoading: (isLoading: boolean) => void, Id: string): Promise<void>;
}

export const executionTimeDelete: IExecutionTimeDelete = async (setIsLoading, Id) => {
    setIsLoading(true);
    let newBody = {
        Id: Id ? Id : null,
    };
    const params = {
        type: 'Task.ExecutionTimeDel',
        body: { ...newBody },
    };
    const postData = await createRequest(params);
    // @ts-ignore
    const { error } = postData.data as IServerResponse;
    if (error) {
        console.log('error', error);
    } else {
        console.log('no error', postData);
    }
    setIsLoading(false);
};

