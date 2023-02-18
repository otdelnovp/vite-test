import React from 'react';
import Box from '@mui/material/Box';

import { sortArrayByProp, sortArrayByTime } from '@helpers/methods';
import { momentToFormatString, startOfMonth, endOfMonth, getHoursMaskByMinutes, getDateTimeStr } from '@helpers/dateHelper';

export interface ISDRPlanData {
    Id: string | null;
    Name: string | null;
    CompanyId: string | null;
    CompanyName: string | null;
}

export const emptySDRPlanData: ISDRPlanData = {
    Id: null,
    Name: null,
    CompanyId: null,
    CompanyName: null,
};

export const prepareSDRPlanData = (sdrPlanData: ISDRPlanData) => {
    return {
        ...sdrPlanData,
    };
};

export interface ISDRPlanTasksData {
    Id: string | null;
    Level?: number | null;
    Number?: number | null;
    Depth?: number;
    WBS?: string | null;
    ParentId: string | null;
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
    StartDatePlan: string | null;
    EndDatePlan: string | null;
    PlannedTime: number | null;
    StartDateFact: string | null;
    EndDateFact: string | null;
    ExecutedTime: number | null;
    ExecutedPercent: number | null;
    Priority: string;
}

export const prepareSDRPlanTaskData = (sdrPlanData: ISDRPlanTasksData) => {
    return {
        ...sdrPlanData,
        Name: sdrPlanData.Number + '. ' + sdrPlanData.Title,
    };
};

export const prepareSDRPlanTasksData = (sdrPlans: ISDRPlanTasksData[]) => {
    if (sdrPlans?.length) {
        // @ts-ignore
        const depthTreeSort = (arr: ISDRPlanTasksData[]) => {
            const makeTree = (arr: ISDRPlanTasksData[]) => {
                let tree = {};
                arr.forEach((item) => {
                    // @ts-ignore
                    if (!tree[item.ParentId]) tree[item.ParentId] = [];
                    // @ts-ignore
                    tree[item.ParentId].push(item);
                });
                return tree;
            };
            // @ts-ignore
            const depthTraversal = (tree, parentId: string | null = null, parentIndex: number = 0, currentDepth: number = 0) => {
                // @ts-ignore
                let children: ISDRPlanTasksData[] = tree[parentId];
                if (children?.length) {
                    children = children.map((item: ISDRPlanTasksData, index) => ({
                        ...item,
                        Depth: currentDepth,
                        WBS: currentDepth ? `${parentIndex}.${index + 1}` : (index + 1).toString(),
                    }));
                    children.forEach((item: ISDRPlanTasksData, index) => {
                        // @ts-ignore
                        const insertArr: ISDRPlanTasksData[] = depthTraversal(tree, item.Id, item.WBS, currentDepth + 1);
                        // @ts-ignore
                        if (insertArr?.length) children.splice(index + 1, 0, ...insertArr);
                    });
                }
                return children;
            };
            return depthTraversal(makeTree(arr));
        };

        const result: ISDRPlanTasksData[] = depthTreeSort(sortArrayByTime(sdrPlans, 'CreateDate'));
        return result.map((sdrPlan: ISDRPlanTasksData) => prepareSDRPlanTaskData(sdrPlan));
    } else return [];
};

export const sdrPlanTaskColumns = [
    {
        name: 'Id',
        label: 'ИД рабочего пространства',
        options: {
            filter: false,
            searchable: false,
            viewColumns: false,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'Depth',
        label: 'Depth',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sortThirdClickReset: true,
            display: false,
        },
    },
    {
        name: 'WBS',
        label: 'WBS',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
        },
    },
    {
        name: 'BoardStateName',
        label: 'Статус',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
        },
    },
    {
        name: 'Name',
        label: 'Название',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return <Box sx={{ marginLeft: tableMeta.tableData[tableMeta.rowIndex].Depth * 3 }}>{value}</Box>;
            },
        },
    },
    {
        name: 'PlannedTime',
        label: 'Время работы',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                return (
                    <Box sx={{ whiteSpace: 'nowrap', fontSize: '0.8em' }}>
                        <Box>П: {getHoursMaskByMinutes(tableMeta.tableData[tableMeta.rowIndex].PlannedTime)}</Box>
                        <Box>Ф: {getHoursMaskByMinutes(tableMeta.tableData[tableMeta.rowIndex].ExecutedTime)}</Box>
                    </Box>
                );
            },
        },
    },
    {
        name: 'StartDatePlan',
        label: 'Дата начала',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                const startDatePlan = tableMeta.tableData[tableMeta.rowIndex].StartDatePlan;
                const startDateFact = tableMeta.tableData[tableMeta.rowIndex].StartDateFact;
                return (
                    <Box sx={{ whiteSpace: 'nowrap', fontSize: '0.8em' }}>
                        <Box>П: {startDatePlan ? getDateTimeStr(startDatePlan) : '—'}</Box>
                        <Box>Ф: {startDatePlan ? getDateTimeStr(startDateFact) : '—'}</Box>
                    </Box>
                );
            },
        },
    },
    {
        name: 'StartDatePlan',
        label: 'Дата окончания',
        options: {
            filter: false,
            searchable: false,
            viewColumns: true,
            sort: false,
            sortThirdClickReset: true,
            display: true,
            customBodyRender: (value: any, tableMeta: any, updateValue: any) => {
                const endDatePlan = tableMeta.tableData[tableMeta.rowIndex].EndDatePlan;
                const endDateFact = tableMeta.tableData[tableMeta.rowIndex].EndDateFact;
                return (
                    <Box sx={{ whiteSpace: 'nowrap', fontSize: '0.8em' }}>
                        <Box>П: {endDatePlan ? getDateTimeStr(endDatePlan) : '—'}</Box>
                        <Box>Ф: {endDateFact ? getDateTimeStr(endDateFact) : '—'}</Box>
                    </Box>
                );
            },
        },
    },
];

export interface ISDRPlanGanttData {
    type: 'task' | 'milestone' | 'project';
    id: string;
    name: string;
    start: Date;
    end: Date;
    progress: number;
    displayOrder?: number;
    dependencies?: string[];
    project?: string;
    isDisabled?: boolean;
    hideChildren?: boolean;
}

const currentDate = new Date();
export const prepareSDRPlanGanttData = (sdrPlanTasksData: ISDRPlanTasksData[]): ISDRPlanGanttData[] => {
    // return testGanttTasks;
    return sdrPlanTasksData.map((item) => {
        const start = new Date(item.StartDatePlan || item.StartDateFact || currentDate);
        const end = new Date(item.EndDatePlan || item.EndDateFact || currentDate);
        return {
            type: 'task',
            id: item.Id || '',
            name: `${item.WBS}. ${item.Title}`,
            start,
            end: end < start ? start : end,
            progress: item.ExecutedTime && item.PlannedTime ? Math.round((item.ExecutedTime / item.PlannedTime) * 100) : 0,
            dependencies: item.ParentId ? [item.ParentId] : undefined,
        };
    });
};
