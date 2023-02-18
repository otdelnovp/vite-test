import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { Pager } from '@core/Pager/Pager';

import { RootState } from '@services/index';
import { lkSelector, setPager } from '@services/lkService';

const UserPager = ({ count, pager }: UserPagerReduxProps) => {
    const dispatch = useDispatch();
    return (
        <Pager
            count={count}
            limit={pager.Limit}
            current={pager.Offset / pager.Limit + 1}
            onChange={(newPage) => dispatch(setPager({ ...pager, Offset: (newPage - 1) * pager.Limit }))}
        />
    );
};

const mapStateToProps = (state: RootState) => {
    const { count, pager } = lkSelector(state);
    return { count, pager };
};

const connector = connect(mapStateToProps);
type UserPagerReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(UserPager);
