import React, { useState, useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from 'src';

import { Loader } from '@core/Loader/Loader';

import { userSelector } from '@services/userService';
import { getTasks, resetTasks, taskSelector } from '@services/taskService';
import { RootState } from '@services/index';
import { clearDictionaryElement, dictionaryElementSelector, getDictionaryElement } from '@services/dictionaryEditService';

import { IProjectElement } from '@pages/Dictionary/Project/model';

import TaskKanbanFilters, { ITaskKanbanFilter, taskKanbanFilterDefault } from './TaskKanbanFilters';
import { IKanbanData, prepareKanbanData } from './methods';
import { TaskKanban } from './TaskKanban';

const TaskKanbanContainer = ({ user, isLoading, tasks, projectData }: TasksReduxProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const [filter, setFilter] = useState<ITaskKanbanFilter>(taskKanbanFilterDefault);
    const [kanbanData, setKanbanData] = useState({} as IKanbanData);

    useEffect(() => {
        if (filter && filter.ProjectId && filter.SprintId) {
            const taskFilter = {
                ProjectId: filter.ProjectId,
                SprintId: filter.SprintId,
                DepartmentId: filter.DepartmentId || null,
                ExecuterUserId: filter.ExecuterUserId || null,
            };
            const taskPager = { page_number: 1, page_size: 500 };
            dispatch(getDictionaryElement('Dictionary.ProjectGet', filter.ProjectId));
            dispatch(getTasks(user, taskFilter, taskPager));
        } else {
            dispatch(clearDictionaryElement());
            dispatch(resetTasks());
        }
    }, [filter]);

    useEffect(() => {
        if (projectData && projectData.BoardStates && projectData.Participants) {
            const participants = filter.ExecuterUserId
                ? [{ UserId: filter.ExecuterUserId, UserName: filter.ExecuterUserName }]
                : projectData.Participants;
            console.log("[{ UserId: filter.ExecuterUserId, UserName: filter.ExecuterUserName }]", [{ UserId: filter.ExecuterUserId, UserName: filter.ExecuterUserName }])
            const newKanbanData = prepareKanbanData(participants, projectData.BoardStates, tasks ? tasks : []);
            setKanbanData(newKanbanData);
        } else {
            setKanbanData({} as IKanbanData);
        }
    }, [projectData, tasks]);

    return (
        <React.Fragment>
            <TaskKanbanFilters user={user} filter={filter} setFilter={setFilter} />
            {isLoading ? <Loader /> : <TaskKanban user={user} kanbanData={kanbanData} />}
        </React.Fragment>
    );
};
const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { isLoading: isLoadingTasks, tasks } = taskSelector(state);
    const elementData = dictionaryElementSelector(state).elementData as IProjectElement;
    const isLoadingProject = dictionaryElementSelector(state).isLoading;
    const isLoading = isLoadingTasks || isLoadingProject;

    return { user, isLoading, tasks, projectData: elementData };
};

const connector = connect(mapStateToProps);
type TasksReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(TaskKanbanContainer);
