import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { AppDispatch } from '../../../index';

import { userSelector } from '@services/userService';
import { getTasks, setFilters, resetPager, taskSelector, setPager } from '@services/taskService';
import { RootState } from '@services/index';

import { Columns } from '@core/Columns/Columns';
import { TaskList } from './TaskList';
import { TaskFilters } from './TaskFilters';
import { TaskPager } from './TaskPager';

import { ITaskFilters, defaultTaskFilters, ITaskPager, defaultTaskPager } from './methods';
import { useEffectOnce } from '@hooks/useEffectOnce';

const TaskListContainer = ({ user, isLoading, tasks, filters, pager }: TasksReduxProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const onResetPager = () => dispatch(resetPager());

    const onGetTasks = (newFilters: ITaskFilters = filters, newPager: ITaskPager = defaultTaskPager) =>
        dispatch(getTasks(user, newFilters, newPager, undefined));

    const onSetFilters = (newFilters: ITaskFilters = defaultTaskFilters) => {
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            const newPager = { ...pager, page_number: 1 };
            onResetPager();
            onGetTasks(filters, newPager);
            dispatch(setFilters(newFilters));
        }
    };
    const onSetPage = (newPage: number) => {
        if (pager.page_number !== newPage) {
            const newPager = { ...pager, page_number: newPage };
            dispatch(setPager(newPager));
            onGetTasks(filters, newPager);
        }
    };

    useEffectOnce(() => {
        onGetTasks(filters, pager);
        return () => {
            // onResetFilters();
            // onResetPager();
        };
    });

    return (
        <Columns
            content={
                <React.Fragment>
                    <TaskList tasks={tasks} isLoading={isLoading} user={user} />
                    <TaskPager pager={pager} setPage={onSetPage} />
                </React.Fragment>
            }
            aside={<TaskFilters user={user} filters={filters} setFilters={onSetFilters} />}
            asideBg={true}
            reverse={true}
        />
    );
};
const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { isLoading, tasks, filters, pager } = taskSelector(state);
    return { user, isLoading, tasks, filters, pager };
};

const connector = connect(mapStateToProps);
type TasksReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(TaskListContainer);

