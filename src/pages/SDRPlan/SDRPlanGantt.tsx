import React, { useState } from 'react';

import { Gantt, Task, EventOption, StylingOption, ViewMode, DisplayOption } from 'gantt-task-react';

import { Loader } from '@core/Loader/Loader';

import { IUserData } from '@helpers/authHelper';
import { ISDRPlanData, ISDRPlanGanttData } from './methods';

import './index.css';

export interface ISDRPlanGantt {
    sdrPlan: ISDRPlanData;
    sdrPlanGantt: ISDRPlanGanttData[];
    isLoadingTasks: boolean;
    onReload: () => void;
    user: IUserData | null;
}

export const SDRPlanGantt = ({ sdrPlan, sdrPlanGantt, isLoadingTasks, onReload, user }: ISDRPlanGantt) => {
    return isLoadingTasks || !sdrPlanGantt?.length ? (
        <Loader />
    ) : (
        <div style={{ maxWidth: '92vw', position: 'relative' }}>
            <Gantt
                tasks={[...sdrPlanGantt]}
                listCellWidth={''}
                locale="ru"
                // viewMode={view}
                // onDateChange={onTaskChange}
                // onTaskDelete={onTaskDelete}
                // onProgressChange={onProgressChange}
                // onDoubleClick={onDblClick}
                // onClick={onClick}
            />
        </div>
    );
};
