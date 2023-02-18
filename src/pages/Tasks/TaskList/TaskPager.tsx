import React from 'react';
import { Pager } from '@core/Pager/Pager';
import { ITaskPager } from './methods';

export interface ITaskPagerComponent {
    pager: ITaskPager;
    setPage: (newPage: number) => void;
}
export const TaskPager = ({ pager, setPage }: ITaskPagerComponent) => {
    const onSetPager = (newPage: number) => {
        setPage(newPage);
    };
    return <Pager count={pager.row_count || 0} limit={pager.page_size} current={pager.page_number} onChange={onSetPager} />;
};
