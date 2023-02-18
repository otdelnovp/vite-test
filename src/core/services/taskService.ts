import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';
import {
    emptyTaskData,
    ITaskData,
    prepareTaskData,
    ITaskListData,
    prepareTasksData,
    ITaskCommentData,
    prepareTaskCommentsData,
    ITaskExecutionTimeData,
    prepareTaskActivities,
    prepareTaskExecutionTimesData,
    ITaskParticipantData,
    prepareTaskParticipantsData,
    prepareTaskFilesData,
} from '@pages/Tasks/methods';
import { ITaskFinderFilters, prepareGetTaskFinderFilters } from '@pages/Tasks/TaskFinder/methods';
import { prepareGetTasksFilters, ITaskFilters, defaultTaskFilters, ITaskPager, defaultTaskPager } from '@pages/Tasks/TaskList/methods';
import { IUserData } from '@helpers/authHelper';
import { IRouteFindFilter, emptyRouteFindFilter } from '@helpers/routeHelper';
import { sortArrayByProp } from '@helpers/methods';
import { IFileData } from '@helpers/fileHelper';

interface ITaskSlice {
    isLoading: boolean;
    tasks: ITaskListData[] | null;
    pager: ITaskPager;
    filters: ITaskFilters;
    task: ITaskData | null;
    routeFilters: IRouteFindFilter;
    commentList: ITaskCommentData[] | null;
    isLoadingCommentList: boolean;
    executionTimeList: ITaskExecutionTimeData[] | null;
    isLoadingExecutionTimeList: boolean;
    activitiesList: ITaskCommentData[] | ITaskExecutionTimeData[] | null;
    participantList: ITaskParticipantData[] | null;
    isLoadingParticipantList: boolean;
    fileList: IFileData[] | null;
    isLoadingFileList: boolean;
    currentParticipantUser: string;
    currentFileId: string;
}

const initialState: ITaskSlice = {
    isLoading: false,
    tasks: null,
    pager: defaultTaskPager,
    filters: defaultTaskFilters,
    task: null,
    routeFilters: emptyRouteFindFilter,
    commentList: null,
    isLoadingCommentList: false,
    executionTimeList: null,
    isLoadingExecutionTimeList: false,
    activitiesList: null,
    participantList: null,
    isLoadingParticipantList: false,
    fileList: null,
    isLoadingFileList: false,
    currentParticipantUser: '',
    currentFileId: '',
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setFilters: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.filters = action.payload;
        },
        resetFilters: () => {
            return { ...initialState };
        },

        setPager: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.pager = action.payload;
        },
        resetPager: (state: ITaskSlice) => {
            state.pager = defaultTaskPager;
        },

        //////

        resetTasks: (state: ITaskSlice) => {
            state.tasks = null;
        },

        getTasksRequest: (state: ITaskSlice) => {
            state.isLoading = true;
            state.tasks = null;
        },
        getTasksSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.tasks = prepareTasksData(action.payload?.result?.rows);
            state.pager = { ...state.pager, page_count: action.payload?.result?.page_count, row_count: action.payload?.result?.row_count };
        },
        getTasksFailure: (state: ITaskSlice) => {
            state.isLoading = false;
            state.tasks = null;
        },

        getTaskFinderListRequest: () => {},
        getTaskFinderListSuccess: () => {},
        getTaskFinderListFailure: () => {},

        //////

        resetTask: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.task = {
                ...emptyTaskData,
                CreateUserId: action.payload?.UserId,
            };
        },

        getTaskRequest: (state: ITaskSlice) => {
            state.isLoading = true;
        },
        getTaskSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.task = prepareTaskData(action.payload?.result?.Task);
            state.participantList = prepareTaskParticipantsData(action.payload?.result?.ParticipantList);
            state.commentList = prepareTaskCommentsData(action.payload?.result?.CommentList);
            state.executionTimeList = prepareTaskExecutionTimesData(action.payload?.result?.ExecutionTimeList);
            state.fileList = prepareTaskFilesData(action.payload?.result?.FileList);
        },
        getTaskFailure: (state: ITaskSlice) => {
            state.isLoading = false;
        },

        //////

        editTaskRequest: (state: ITaskSlice) => {
            // state.isLoading = true;
        },
        editTaskSuccess: (state: ITaskSlice) => {
            state.isLoading = false;
        },
        editTaskFailure: (state: ITaskSlice) => {
            state.isLoading = false;
        },

        //////

        getTaskParticipantListRequest: (state: ITaskSlice) => {
            state.isLoadingParticipantList = true;
            state.participantList = null;
        },
        getTaskParticipantListSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingParticipantList = false;
            state.participantList = action.payload?.result;
        },
        getTaskParticipantListFailure: (state: ITaskSlice) => {
            state.isLoadingParticipantList = false;
            state.participantList = null;
        },

        addTaskParticipantRequest: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingParticipantList = true;
            state.currentParticipantUser = JSON.stringify({
                UserId: action.payload.UserId,
                UserName: action.payload.UserName,
            });
        },
        addTaskParticipantSuccess: (state: ITaskSlice) => {
            state.isLoadingParticipantList = false;
            const participantUser = JSON.parse(state.currentParticipantUser);
            state.participantList = sortArrayByProp(
                [
                    ...(state.participantList || []),
                    {
                        UserId: participantUser?.UserId || '',
                        UserName: participantUser?.UserName || '',
                        UserFullName: participantUser?.UserName || '',
                    },
                ],
                'UserFullName',
            );
        },
        addTaskParticipantFailure: (state: ITaskSlice) => {
            state.isLoadingParticipantList = false;
        },

        delTaskParticipantRequest: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingParticipantList = true;
            state.currentParticipantUser = JSON.stringify({
                UserId: action.payload.UserId,
                UserName: '',
            });
        },
        delTaskParticipantSuccess: (state: ITaskSlice) => {
            state.isLoadingParticipantList = false;
            const participantUser = JSON.parse(state.currentParticipantUser);
            state.participantList = state.participantList
                ? JSON.parse(JSON.stringify(state.participantList)).filter((item: ITaskParticipantData) => item.UserId !== participantUser.UserId)
                : null;
        },
        delTaskParticipantFailure: (state: ITaskSlice) => {
            state.isLoadingParticipantList = false;
        },

        //////

        getTaskCommentListRequest: (state: ITaskSlice) => {
            state.isLoadingCommentList = true;
        },
        getTaskCommentListSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingCommentList = false;
            state.commentList = prepareTaskCommentsData(action.payload?.result);
        },
        getTaskCommentListFailure: (state: ITaskSlice) => {
            state.isLoadingCommentList = false;
            state.commentList = null;
        },

        editTaskCommentRequest: (state: ITaskSlice) => {},
        editTaskCommentSuccess: (state: ITaskSlice) => {},
        editTaskCommentFailure: (state: ITaskSlice) => {},

        //////

        getTaskExecutionTimeListRequest: (state: ITaskSlice) => {
            state.isLoadingExecutionTimeList = true;
        },
        getTaskExecutionTimeListSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingExecutionTimeList = false;
            state.executionTimeList = prepareTaskExecutionTimesData(action.payload?.result);
        },
        getTaskExecutionTimeListFailure: (state: ITaskSlice) => {
            state.isLoadingExecutionTimeList = false;
            state.executionTimeList = null;
        },

        editTaskExecutionTimeRequest: (state: ITaskSlice) => {},
        editTaskExecutionTimeSuccess: (state: ITaskSlice) => {},
        editTaskExecutionTimeFailure: (state: ITaskSlice) => {},

        delTaskExecutionTimeRequest: (state: ITaskSlice) => {},
        delTaskExecutionTimeSuccess: (state: ITaskSlice) => {},
        delTaskExecutionTimeFailure: (state: ITaskSlice) => {},

        //////

        getTaskFileListRequest: (state: ITaskSlice) => {
            state.isLoadingFileList = true;
        },
        getTaskFileListSuccess: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingFileList = false;
            state.fileList = prepareTaskFilesData(action.payload?.result);
        },
        getTaskFileListFailure: (state: ITaskSlice) => {
            state.isLoadingFileList = false;
            state.fileList = null;
        },

        addTaskFileRequest: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingFileList = true;
        },
        addTaskFileSuccess: (state: ITaskSlice) => {
            state.isLoadingFileList = false;
        },
        addTaskFileFailure: (state: ITaskSlice) => {
            state.isLoadingFileList = false;
        },

        delTaskFileRequest: (state: ITaskSlice, action: PayloadAction<any>) => {
            state.isLoadingFileList = true;
            state.currentFileId = action.payload.fileId;
        },
        delTaskFileSuccess: (state: ITaskSlice) => {
            state.isLoadingFileList = false;
            state.fileList = state.fileList
                ? JSON.parse(JSON.stringify(state.fileList)).filter((item: IFileData) => item.Id !== state.currentFileId)
                : null;
        },
        delTaskFileFailure: (state: ITaskSlice) => {
            state.isLoadingFileList = false;
        },
    },
});

const { reducer, actions } = taskSlice;

export const {
    setFilters,
    resetFilters,

    setPager,
    resetPager,

    //////

    resetTasks,

    getTasksRequest,
    getTasksSuccess,
    getTasksFailure,

    getTaskFinderListRequest,
    getTaskFinderListSuccess,
    getTaskFinderListFailure,

    resetTask,

    getTaskRequest,
    getTaskSuccess,
    getTaskFailure,

    editTaskRequest,
    editTaskSuccess,
    editTaskFailure,

    //////

    getTaskParticipantListRequest,
    getTaskParticipantListSuccess,
    getTaskParticipantListFailure,

    addTaskParticipantRequest,
    addTaskParticipantSuccess,
    addTaskParticipantFailure,

    delTaskParticipantRequest,
    delTaskParticipantSuccess,
    delTaskParticipantFailure,

    //////

    getTaskCommentListRequest,
    getTaskCommentListSuccess,
    getTaskCommentListFailure,

    editTaskCommentRequest,
    editTaskCommentSuccess,
    editTaskCommentFailure,

    //////

    getTaskExecutionTimeListRequest,
    getTaskExecutionTimeListSuccess,
    getTaskExecutionTimeListFailure,

    editTaskExecutionTimeRequest,
    editTaskExecutionTimeSuccess,
    editTaskExecutionTimeFailure,

    delTaskExecutionTimeRequest,
    delTaskExecutionTimeSuccess,
    delTaskExecutionTimeFailure,

    //////

    getTaskFileListRequest,
    getTaskFileListSuccess,
    getTaskFileListFailure,

    addTaskFileRequest,
    addTaskFileSuccess,
    addTaskFileFailure,

    delTaskFileRequest,
    delTaskFileSuccess,
    delTaskFileFailure,
} = actions;

export const taskSelector = (state: RootState) => {
    const { isLoading, tasks, filters, pager, task, commentList, executionTimeList, participantList, fileList } = state.task;
    const activitiesList = prepareTaskActivities(commentList, executionTimeList);
    return {
        isLoading,
        tasks,
        filters,
        pager,
        task,
        commentList,
        executionTimeList,
        activitiesList,
        participantList,
        fileList,
    };
};

export const getTasks = (user: IUserData | null, filters: ITaskFilters, pager: ITaskPager, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.List',
        body: prepareGetTasksFilters(filters, pager),
    };
    const actionTypes = {
        request: getTasksRequest,
        success: getTasksSuccess,
        failure: getTasksFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getTaskFinderList = (filters: ITaskFinderFilters, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.List',
        body: prepareGetTaskFinderFilters(filters),
    };
    const actionTypes = {
        request: getTaskFinderListRequest,
        success: getTaskFinderListSuccess,
        failure: getTaskFinderListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getTask = (TaskId: string, lightMode?: boolean, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'System.Batch',
        body: {
            CALL: lightMode
                ? [
                      {
                          type: 'Task.Get',
                          body: {
                              Id: TaskId,
                          },
                          label: 'Task',
                      },
                      {
                          type: 'Task.AttachmentList',
                          body: {
                              TaskId,
                          },
                          label: 'FileList',
                      },
                  ]
                : [
                      {
                          type: 'Task.Get',
                          body: {
                              Id: TaskId,
                          },
                          label: 'Task',
                      },
                      {
                          type: 'Task.AttachmentList',
                          body: {
                              TaskId,
                          },
                          label: 'FileList',
                      },
                      {
                          type: 'Task.ParticipantList',
                          body: {
                              TaskId,
                          },
                          label: 'ParticipantList',
                      },
                      {
                          type: 'Task.CommentList',
                          body: {
                              TaskId,
                          },
                          label: 'CommentList',
                      },
                      {
                          type: 'Task.ExecutionTimeList',
                          body: {
                              TaskId,
                          },
                          label: 'ExecutionTimeList',
                      },
                  ],
        },
    };
    const actionTypes = {
        request: getTaskRequest,
        success: getTaskSuccess,
        failure: getTaskFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editTask = (taskId: string | null | undefined, taskNewFields: any, user: IUserData | null, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.Edit',
        body: {
            Id: taskId || null,
            UserId: user?.UserId,
            ...taskNewFields,
        },
    };
    const actionTypes = {
        request: editTaskRequest,
        success: editTaskSuccess,
        failure: editTaskFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

//////

export const getTaskParticipantList = (TaskId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ParticipantList',
        body: {
            TaskId,
        },
    };
    const actionTypes = {
        request: getTaskParticipantListRequest,
        success: getTaskParticipantListSuccess,
        failure: getTaskParticipantListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const addTaskParticipant = (TaskId: string | undefined, UserId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ParticipantAdd',
        body: {
            TaskId,
            UserId,
        },
    };
    const actionTypes = {
        request: addTaskParticipantRequest,
        success: addTaskParticipantSuccess,
        failure: addTaskParticipantFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const delTaskParticipant = (TaskId: string | undefined, UserId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ParticipantDel',
        body: {
            TaskId,
            UserId,
        },
    };
    const actionTypes = {
        request: delTaskParticipantRequest,
        success: delTaskParticipantSuccess,
        failure: delTaskParticipantFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

//////

export const getTaskCommentList = (TaskId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.CommentList',
        body: {
            TaskId,
        },
    };
    const actionTypes = {
        request: getTaskCommentListRequest,
        success: getTaskCommentListSuccess,
        failure: getTaskCommentListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editTaskComment = (commentData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.CommentEdit',
        body: commentData,
    };
    const actionTypes = {
        request: editTaskCommentRequest,
        success: editTaskCommentSuccess,
        failure: editTaskCommentFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

//////

export const getTaskExecutionTimeList = (TaskId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ExecutionTimeList',
        body: {
            TaskId,
        },
    };
    const actionTypes = {
        request: getTaskExecutionTimeListRequest,
        success: getTaskExecutionTimeListSuccess,
        failure: getTaskExecutionTimeListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const editTaskExecutionTime = (executionTimeData: any, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ExecutionTimeEdit',
        body: executionTimeData,
    };
    const actionTypes = {
        request: editTaskExecutionTimeRequest,
        success: editTaskExecutionTimeSuccess,
        failure: editTaskExecutionTimeFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const delTaskExecutionTime = (id: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.ExecutionTimeDel',
        body: {
            Id: id,
        },
    };
    const actionTypes = {
        request: editTaskExecutionTimeRequest,
        success: editTaskExecutionTimeSuccess,
        failure: editTaskExecutionTimeFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

//////

export const getTaskFileList = (TaskId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.AttachmentList',
        body: {
            TaskId,
        },
    };
    const actionTypes = {
        request: getTaskFileListRequest,
        success: getTaskFileListSuccess,
        failure: getTaskFileListFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const addTaskFile = (TaskId: string | undefined, UserId: string, FileId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.AttachmentAdd',
        body: {
            TaskId,
            UserId,
            FileId,
        },
    };
    const actionTypes = {
        request: addTaskFileRequest,
        success: addTaskFileSuccess,
        failure: addTaskFileFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const delTaskFile = (TaskId: string | undefined, FileId: string, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.AttachmentDel',
        body: {
            TaskId,
            FileId,
        },
    };
    const actionTypes = {
        request: delTaskFileRequest,
        success: delTaskFileSuccess,
        failure: delTaskFileFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
