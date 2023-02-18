import { IFileData } from '@helpers/fileHelper';
import { sortArrayByProp, sortArrayByTime } from '@helpers/methods';
import { momentToFormatString, startOfMonth, endOfMonth } from '@helpers/dateHelper';

// task comments

export interface ITaskCommentData {
    Comment: string | null;
    Id?: string | null;
    CreateDate?: string | null;
    ModifyDate?: string | null;
    TaskId: string | null;
    UserId: string;
    UserName?: string;
    UserFirstName?: string;
    UserLastName?: string;
    UserFullName?: string;
}
export const prepareTaskCommentData = (taskComment: ITaskCommentData) => {
    return {
        ...taskComment,
        UserFullName: taskComment.UserLastName
            ? `${taskComment.UserLastName} ${taskComment.UserFirstName || ''}`
            : taskComment.UserFirstName || taskComment.UserName,
    };
};
export const prepareTaskCommentsData = (comments: ITaskCommentData[]) =>
    comments?.length
        ? sortArrayByTime(
              comments.map((comment: ITaskCommentData) => prepareTaskCommentData(comment)),
              'CreateDate',
          )
        : [];

// task executionTimes

export interface ITaskExecutionTimeData {
    Time: number;
    Comment: string | null;
    Id?: string | null;
    CreateDate?: string | null;
    ModifyDate?: string | null;
    Date?: string | null;
    TaskId: string | null;
    UserId: string;
    UserName?: string;
    UserFirstName?: string;
    UserLastName?: string;
    UserFullName?: string;
}
export const prepareTaskExecutionTimeData = (taskExecutionTime: ITaskExecutionTimeData) => {
    return {
        ...taskExecutionTime,
        UserFullName: taskExecutionTime.UserLastName
            ? `${taskExecutionTime.UserLastName} ${taskExecutionTime.UserFirstName || ''}`
            : taskExecutionTime.UserFirstName || taskExecutionTime.UserName,
    };
};
export const prepareTaskExecutionTimesData = (taskExecutionTimes: ITaskExecutionTimeData[]) =>
    taskExecutionTimes?.length
        ? sortArrayByTime(
              taskExecutionTimes.map((taskExecutionTimes: ITaskExecutionTimeData) => prepareTaskExecutionTimeData(taskExecutionTimes)),
              'CreateDate',
          )
        : [];

// prepareTaskActivitiesData

export const prepareTaskActivities = (comments: ITaskCommentData[] | null, taskExecutionTimes: ITaskExecutionTimeData[] | null) =>
    sortArrayByTime([...(comments || []), ...(taskExecutionTimes || [])], 'CreateDate');

// task participants

export interface ITaskParticipantData {
    UserId: string;
    UserName: string;
    UserFirstName?: string;
    UserLastName?: string;
    UserFullName?: string;
}
export const prepareTaskParticipantData = (taskParticipant: ITaskParticipantData) => {
    return {
        ...taskParticipant,
        UserFullName: taskParticipant.UserLastName
            ? `${taskParticipant.UserLastName} ${taskParticipant.UserFirstName || ''}`
            : taskParticipant.UserFirstName || taskParticipant.UserName,
    };
};
export const prepareTaskParticipantsData = (participants: ITaskParticipantData[]) =>
    participants?.length
        ? sortArrayByProp(
              participants.map((participant: ITaskParticipantData) => prepareTaskParticipantData(participant)),
              'UserFullName',
          )
        : [];

// task files

export const prepareTaskFileData = (taskFile: IFileData) => {
    return {
        ...taskFile,
    };
};
export const prepareTaskFilesData = (files: IFileData[]) => (files?.length ? files.map((file: IFileData) => prepareTaskFileData(file)) : []);

// task

export interface ITaskData {
    Id: string | null;
    Number: string | null;
    Title: string | null;
    Description: string | null;
    TypeId: string | null;
    TypeName: string | null;
    SprintId: string | null;
    SprintName: string | null;
    StateId: string | null;
    StateName: string | null;
    BoardStateId: string | null;
    BoardStateName: string | null;
    CreateDate: string | null;
    CreateUserId: string | null;
    CreateUserName: string | null;
    ExecuterUserId: string | null;
    ExecuterUserName: string | null;
    ModifyDate: string | null;
    ModifyUserId: string | null;
    ModifyUserName: string | null;
    CompanyId: string | null;
    CompanyName: string | null;
    DepartmentId: string | null;
    DepartmentName: string | null;
    ProjectId: string | null;
    ProjectName: string | null;
    Priority: string | null;
    StartDatePlan: string | null;
    EndDatePlan: string | null;
    PlannedTime: number | null;
    StartDateFact: string | null;
    EndDateFact: string | null;
    ExecutedTime: number | null;
    ExecutedPercent: number | null;
    ParentId: string | null;
    ParentTitle: string | null;
    IsDeleted: boolean;
}

export interface ITaskListData {
    Id: string | null;
    Number: string | null;
    Title: string | null;
    StateName: string | null;
    BoardStateName: string | null;
    TypeName: string | null;
    CreateDate: string | null;
    CreateUserName: string | null;
    ModifyDate: string | null;
    ModifyUserName: string | null;
    CompanyName: string | null;
    DepartmentName: string | null;
    ProjectName: string | null;
    IsDeleted: boolean;
    ExecuterUserId: string | null;
    BoardStateId: string | null;
    Priority: string;
    StartDatePlan: string;
    StartDateFact: string;
    EndDateFact: string;
}

export const emptyTaskData: ITaskData = {
    Id: null,
    Number: null,
    Title: null,
    Description: null,
    TypeId: null,
    TypeName: null,
    SprintId: null,
    SprintName: null,
    StateId: null,
    StateName: null,
    BoardStateId: null,
    BoardStateName: null,
    CreateDate: null,
    CreateUserId: null,
    CreateUserName: null,
    ExecuterUserId: null,
    ExecuterUserName: null,
    ModifyDate: null,
    ModifyUserId: null,
    ModifyUserName: null,
    CompanyId: null,
    CompanyName: null,
    DepartmentId: null,
    DepartmentName: null,
    ProjectId: null,
    ProjectName: null,
    Priority: 'M',
    StartDatePlan: null,
    EndDatePlan: null,
    PlannedTime: 0,
    StartDateFact: null,
    EndDateFact: null,
    ExecutedTime: 0,
    ExecutedPercent: 0,
    ParentId: null,
    ParentTitle: null,
    IsDeleted: false,
};

export const prepareTaskData = (taskData: ITaskData) => {
    return {
        ...taskData,
    };
};

export const prepareTaskListData = (taskData: ITaskListData) => {
    return {
        ...taskData,
        Name: taskData.Number + '. ' + taskData.Title,
    };
};

export const prepareTasksData = (tasks: ITaskListData[]) => (tasks?.length ? tasks.map((task: ITaskListData) => prepareTaskListData(task)) : []);
