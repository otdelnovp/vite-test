import { IUserData } from '@helpers/authHelper';
import { momentToFormatString, startOfMonth, endOfMonth } from '@helpers/dateHelper';

export interface ITaskFilters {
    CompanyId?: string | null;
    DepartmentId?: string | null;
    ProjectId?: string | null;
    SprintId?: string | null;
    TypeId?: string | null;
    StateId?: string | null;
    Priority?: string | null;
    TaskName?: string | null;
    DateFrom?: string;
    DateTo?: string;
    IsDeleted?: boolean;
}
export const defaultTaskFilters: ITaskFilters = {
    DateFrom: momentToFormatString(startOfMonth()),
    DateTo: momentToFormatString(endOfMonth()),
    CompanyId: null,
    DepartmentId: null,
    ProjectId: null,
    SprintId: null,
    TypeId: null,
    StateId: null,
    Priority: null,
    TaskName: null,
    // IsDeleted: false,
};

export interface ITaskPager {
    page_size: number;
    page_number: number;
    page_count?: number;
    row_count?: number;
}
export const defaultTaskPager: ITaskPager = {
    page_size: 5,
    page_number: 1,
    page_count: 0,
    row_count: 0,
};

export const prepareGetTasksFilters = (filters: ITaskFilters, pager: ITaskPager) => {
    const bodyFilters: ITaskFilters = {
        ...pager,
        ...filters,
        ProjectId: filters.ProjectId ? filters.ProjectId : null,
        SprintId: filters.SprintId ? filters.SprintId : null,
    };

    if (filters.TaskName) {
        return {
            ...pager,
            TaskName: bodyFilters.TaskName,
        };
    } else bodyFilters.TaskName = null;

    return bodyFilters;
};
