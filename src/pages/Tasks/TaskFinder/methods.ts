export interface ITaskFinderFilters {
    CompanyId?: string | null;
    CompanyName?: string | null;
    DepartmentId?: string | null;
    DepartmentName?: string | null;
    ProjectId?: string | null;
    ProjectName?: string | null;
    SprintId?: string | null;
    SprintName?: string | null;
    UserId?: string | null;
    UserName?: string | null;
    page_size?: number;
    page_number?: number;
}

export const taskFinderFiltersInit: ITaskFinderFilters = {
    UserId: null,
    CompanyId: null,
    DepartmentId: null,
    ProjectId: null,
    SprintId: null,
};

export const prepareGetTaskFinderFilters = (filters: ITaskFinderFilters) => {
    const bodyFilters: ITaskFinderFilters = {
        ...filters,
        page_size: 100,
        page_number: 1,
    };
    return bodyFilters;
};
