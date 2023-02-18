import React, { useState } from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import Task from '@pages/Task/Task';

import { Loader } from '@core/Loader/Loader';
import DataTable from '@core/DataTable/DataTable';

import { IUserData } from '@helpers/authHelper';
import { ISDRPlanData, ISDRPlanTasksData, sdrPlanTaskColumns } from './methods';
import { emptyTaskData } from '@pages/Tasks/methods';

export interface ISDRPlanTasks {
    sdrPlan: ISDRPlanData;
    sdrPlanTasks: ISDRPlanTasksData[];
    isLoadingTasks: boolean;
    onReload: () => void;
    user: IUserData | null;
}

export const SDRPlanTasks = ({ sdrPlan, sdrPlanTasks, isLoadingTasks, onReload, user }: ISDRPlanTasks) => {
    const [currentTask, setCurrentTask] = useState('');
    const onOpenDialog = (value?: string) => (value ? setCurrentTask(value || '') : onOpenAddDialog());
    const onCloseDialog = () => setCurrentTask('');

    const [addTask, setAddTask] = useState(false);
    const onOpenAddDialog = () => setAddTask(true);
    const onCloseAddDialog = () => setAddTask(false);

    const dialogTask = !!currentTask ? (
        <Dialog open={true} onClose={onCloseDialog} fullWidth={true} maxWidth="lg">
            <DialogContent>
                <Task taskIdProp={currentTask} lightMode={true} />
            </DialogContent>
        </Dialog>
    ) : null;

    const dialogAddTask = addTask ? (
        <Dialog open={true} onClose={onCloseAddDialog} fullWidth={true} maxWidth="lg">
            <DialogContent>
                <Task
                    lightMode={true}
                    taskDefaultProps={{
                        ...emptyTaskData,
                        CompanyId: sdrPlan.CompanyId,
                        CompanyName: sdrPlan.CompanyName,
                        ProjectId: sdrPlan.Id,
                        ProjectName: sdrPlan.Name,
                    }}
                    onClose={() => {
                        onCloseAddDialog();
                        onReload();
                    }}
                />
            </DialogContent>
        </Dialog>
    ) : null;

    return isLoadingTasks ? (
        <Loader />
    ) : (
        <>
            <DataTable columns={sdrPlanTaskColumns} data={sdrPlanTasks} showEditDialog={onOpenDialog} />
            {dialogTask}
            {dialogAddTask}
        </>
    );
};
