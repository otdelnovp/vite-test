import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@services/index';

import { asyncRequestAction, IAsyncOptions } from '@services/dispatcher';

import { IUserData } from '@helpers/authHelper';
import { phoneMask } from '@helpers/methods';

import {
    ICompaniesDictionary,
    IDepartmentsDictionary,
    ICompanyUsersDictionary,
    ICompanyOwnershipTypeDictionary,
    IWorkExceptionTypesDictionary,
    ITaskTypesDictionary,
    ITaskStatesDictionary,
    ITaskSprintsDictionary,
    IBoardStatesDictionary,
    IProjectsDictionary,
    IProjectTasksDictionary,
    sortDictionaryByProp,
    IRolesDictionary,
    IUserGroupsDictionary,
} from '@helpers/dictionariesHelper';
import { IUserElement } from '@pages/Dictionary/User/model';

export interface IDictionarySlice {
    companies: ICompaniesDictionary;
    departments: IDepartmentsDictionary;
    companyUsers: ICompanyUsersDictionary;
    companyOwnershipTypes: ICompanyOwnershipTypeDictionary;
    workExceptionTypes: IWorkExceptionTypesDictionary;
    taskTypes: ITaskTypesDictionary;
    taskStates: ITaskStatesDictionary;
    taskSprints: ITaskSprintsDictionary;
    boardStates: IBoardStatesDictionary;
    projects: IProjectsDictionary;
    projectTasks: IProjectTasksDictionary;
    roles: IRolesDictionary;
    userGroups: IUserGroupsDictionary;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
}

const initialState: IDictionarySlice = {
    companies: [],
    departments: [],
    companyUsers: [],
    companyOwnershipTypes: [],
    workExceptionTypes: [],
    taskTypes: [],
    taskStates: [],
    taskSprints: [],
    boardStates: [],
    projects: [],
    projectTasks: [],
    roles: [],
    userGroups: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
};

const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        resetDictionaries: () => {
            return { ...initialState };
        },

        clearDictionary: (state, action: PayloadAction<any>) => {
            //@ts-ignore
            state[action.payload.name] = [];
        },

        // get Companies
        getCompaniesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getCompaniesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.companies = action.payload?.result;
            state.departments = [];
            state.companyUsers = [];
            state.projects = [];
            state.projectTasks = [];
            state.taskSprints = [];
        },
        getCompaniesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get Departments
        getDepartmentsRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getDepartmentsSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.departments = action.payload?.result;
        },
        getDepartmentsFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get CompanyUsers
        getCompanyUsersRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.companyUsers = [];
        },
        getCompanyUsersSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.companyUsers = action.payload?.result?.rows
                ?.filter((usr: IUserElement) => !!usr.id && !!usr.username)
                .map((usr: IUserElement) => ({
                    ...usr,
                    full_name: usr.last_name ? `${usr.last_name} ${usr.first_name || ''}` : usr.first_name || usr.username,
                }))
                .sort((a: any, b: any) => a.full_name.localeCompare(b.full_name));
        },
        getCompanyUsersFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get CompanyOwnershipTypes
        getCompanyOwnershipTypesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getCompanyOwnershipTypesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.companyOwnershipTypes = sortDictionaryByProp(action.payload.result, 'Name');
        },
        getCompanyOwnershipTypesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get WorkExceptionTypes
        getWorkExceptionTypesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getWorkExceptionTypesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.workExceptionTypes = sortDictionaryByProp(action.payload.result, 'Name');
        },
        getWorkExceptionTypesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get TaskTypes
        getTaskTypesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getTaskTypesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.taskTypes = sortDictionaryByProp(action.payload.result, 'Name');
        },
        getTaskTypesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get TaskStates
        getTaskStatesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getTaskStatesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.taskStates = sortDictionaryByProp(action.payload.result, 'Name');
        },
        getTaskStatesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get TaskSprints
        getTaskSprintsRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getTaskSprintsSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.taskSprints = sortDictionaryByProp(action.payload.result, 'DateFrom');
        },
        getTaskSprintsFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get BoardStates
        getBoardStatesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
            state.boardStates = [];
        },
        getBoardStatesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.boardStates = sortDictionaryByProp(action.payload.result, 'BoardStateName');
        },
        getBoardStatesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get Projects
        getProjectsRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getProjectsSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.projects = sortDictionaryByProp(action.payload.result?.rows, 'Name');
            state.projectTasks = [];
            state.taskSprints = [];
        },
        getProjectsFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get ProjectTasks
        getProjectTasksRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getProjectTasksSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.projectTasks = sortDictionaryByProp(action.payload.result?.rows, 'Title');
        },
        getProjectTasksFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get Roles
        getRolesRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getRolesSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.roles = sortDictionaryByProp(action.payload.result, 'title');
        },
        getRolesFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },

        // get UserGroups
        getUserGroupsRequest: (state) => {
            state.isLoading = true;
            state.isSuccess = false;
            state.isError = false;
        },
        getUserGroupsSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.userGroups = sortDictionaryByProp(action.payload.result, 'title');
            state.taskSprints = [];
        },
        getUserGroupsFailure: (state) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
        },
    },
});

const { reducer, actions } = dictionarySlice;

export const {
    resetDictionaries,

    clearDictionary,

    getCompaniesRequest,
    getCompaniesSuccess,
    getCompaniesFailure,

    getDepartmentsRequest,
    getDepartmentsSuccess,
    getDepartmentsFailure,

    getCompanyUsersRequest,
    getCompanyUsersSuccess,
    getCompanyUsersFailure,

    getCompanyOwnershipTypesRequest,
    getCompanyOwnershipTypesSuccess,
    getCompanyOwnershipTypesFailure,

    getWorkExceptionTypesRequest,
    getWorkExceptionTypesSuccess,
    getWorkExceptionTypesFailure,

    getTaskTypesRequest,
    getTaskTypesSuccess,
    getTaskTypesFailure,

    getTaskStatesRequest,
    getTaskStatesSuccess,
    getTaskStatesFailure,

    getTaskSprintsRequest,
    getTaskSprintsSuccess,
    getTaskSprintsFailure,

    getBoardStatesRequest,
    getBoardStatesSuccess,
    getBoardStatesFailure,

    getProjectsRequest,
    getProjectsSuccess,
    getProjectsFailure,

    getProjectTasksRequest,
    getProjectTasksSuccess,
    getProjectTasksFailure,

    getRolesRequest,
    getRolesSuccess,
    getRolesFailure,

    getUserGroupsRequest,
    getUserGroupsSuccess,
    getUserGroupsFailure,
} = actions;

const companiesSelector = (state: RootState) => {
    const { companies } = state.dictionary;
    return { companies };
};
const departmentsSelector = (state: RootState) => {
    const { departments } = state.dictionary;
    return { departments };
};
const companyUsersSelector = (state: RootState) => {
    const { companyUsers } = state.dictionary;
    return { companyUsers };
};
const companyOwnershipTypesSelector = (state: RootState) => {
    const { companyOwnershipTypes } = state.dictionary;
    return { companyOwnershipTypes };
};
const workExceptionTypesSelector = (state: RootState) => {
    const { workExceptionTypes } = state.dictionary;
    return { workExceptionTypes };
};
const taskTypesSelector = (state: RootState) => {
    const { taskTypes } = state.dictionary;
    return { taskTypes };
};
const taskStatesSelector = (state: RootState) => {
    const { taskStates } = state.dictionary;
    return { taskStates };
};
const taskSprintsSelector = (state: RootState) => {
    const { taskSprints } = state.dictionary;
    return { taskSprints };
};
const boardStatesSelector = (state: RootState) => {
    const { boardStates } = state.dictionary;
    return { boardStates };
};
const projectsSelector = (state: RootState) => {
    const { projects } = state.dictionary;
    return { projects };
};
const projectTasksSelector = (state: RootState) => {
    const { projectTasks } = state.dictionary;
    return { projectTasks };
};

const rolesSelector = (state: RootState) => {
    const { roles } = state.dictionary;
    return { roles };
};

const userGroupsSelector = (state: RootState) => {
    const { userGroups } = state.dictionary;
    return { userGroups };
};

export const dictSelectors = {
    companies: companiesSelector,
    departments: departmentsSelector,
    companyUsers: companyUsersSelector,
    companyOwnershipTypes: companyOwnershipTypesSelector,
    workExceptionTypes: workExceptionTypesSelector,
    taskTypes: taskTypesSelector,
    taskStates: taskStatesSelector,
    taskSprints: taskSprintsSelector,
    boardStates: boardStatesSelector,
    projects: projectsSelector,
    projectTasks: projectTasksSelector,
    roles: rolesSelector,
    userGroups: userGroupsSelector,
};

export const getCompanies = (user: IUserData | null | undefined, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.CompanyList',
        body: {
            UserId: user?.UserId || null,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getCompaniesRequest,
        success: getCompaniesSuccess,
        failure: getCompaniesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getDepartments = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.DepartmentList',
        body: {
            ...filters,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getDepartmentsRequest,
        success: getDepartmentsSuccess,
        failure: getDepartmentsFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getCompanyUsers = (filters?: Object, options?: IAsyncOptions) => {
    
    let mappedFilters: { [key: string]: any } = {};
    if (filters) {
        type ObjectKey = keyof typeof filters;
        Object.keys(filters).forEach(function (key, index) {
            const objKey = key as ObjectKey;
            switch (key) {
                case 'CompanyId':
                    mappedFilters['org_id'] = filters[objKey];
                    break;
                case 'DepartmentId':
                    mappedFilters['dept_id'] = filters[objKey];
                    break;
                case 'ProjectId':
                    mappedFilters['project_id'] = filters[objKey];
                    break;
                default:
                    mappedFilters[key] = filters[objKey];
                    break;
            }
        });
    }

    const requestBody = {
        type: 'User.List',
        body: {
            ...mappedFilters,
            page_number: 1,
            page_size: 10000,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getCompanyUsersRequest,
        success: getCompanyUsersSuccess,
        failure: getCompanyUsersFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getCompanyOwnershipTypes = (options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.CompanyOwnershipType',
        body: {
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getCompanyOwnershipTypesRequest,
        success: getCompanyOwnershipTypesSuccess,
        failure: getCompanyOwnershipTypesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getWorkExceptionTypes = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.WorkExceptionTypeList',
        body: {
            ...filters,
            WithDefault: true,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getWorkExceptionTypesRequest,
        success: getWorkExceptionTypesSuccess,
        failure: getWorkExceptionTypesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getTaskTypes = (options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.TaskTypeList',
        body: {
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getTaskTypesRequest,
        success: getTaskTypesSuccess,
        failure: getTaskTypesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getTaskStates = (options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.TaskStateList',
        body: {
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getTaskStatesRequest,
        success: getTaskStatesSuccess,
        failure: getTaskStatesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getTaskSprints = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.SprintList',
        body: {
            ...filters,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getTaskSprintsRequest,
        success: getTaskSprintsSuccess,
        failure: getTaskSprintsFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getBoardStates = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.BoardStateList',
        body: {
            ...filters,
            IsDeleted: false,
        },
    };
    const actionTypes = {
        request: getBoardStatesRequest,
        success: getBoardStatesSuccess,
        failure: getBoardStatesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getProjects = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Dictionary.ProjectList',
        body: {
            ...filters,
            IsDeleted: false,
            DateFrom: '2000-01-01',
            DateTo: '2050-12-31',
            page_number: 1,
            page_size: 1000,
        },
    };
    const actionTypes = {
        request: getProjectsRequest,
        success: getProjectsSuccess,
        failure: getProjectsFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getProjectTasks = (filters?: Object, options?: IAsyncOptions) => {
    const requestBody = {
        type: 'Task.List',
        body: {
            ...filters,
            IsDeleted: false,
            page_number: 1,
            page_size: 1000,
        },
    };
    const actionTypes = {
        request: getProjectTasksRequest,
        success: getProjectTasksSuccess,
        failure: getProjectTasksFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getRoles = (options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.RoleList',
        body: {
            IsDeleted: null,
        },
    };
    const actionTypes = {
        request: getRolesRequest,
        success: getRolesSuccess,
        failure: getRolesFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export const getUserGroups = (filters?: Object,options?: IAsyncOptions) => {
    const requestBody = {
        type: 'User.GroupList',
        body: {
            ...filters,
            IsDeleted: null,
        },
    };
    const actionTypes = {
        request: getUserGroupsRequest,
        success: getUserGroupsSuccess,
        failure: getUserGroupsFailure,
    };
    return asyncRequestAction(requestBody, actionTypes, options);
};

export default reducer;
