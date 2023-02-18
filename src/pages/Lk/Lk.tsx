import React from 'react';
import { useParams } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { PageTitle } from '@core/PageTitle/PageTitle';
import { Loader } from '@core/Loader/Loader';
import { Tabs } from '@core/Tabs/Tabs';
import { tabList } from '@pages/Lk/methods';

import { userSelector } from '@services/userService';
import { getCompany, lkSelector } from '@services/lkService';
import { RootState } from '@services/index';

import { IUserData } from '@helpers/authHelper';

import About from './About/About';
import UserList from './User/UserList';
import { AppDispatch } from '../../index';
import TestFeatures from './Test/Test';

const Lk = ({ user, company, isLoading }: LkReduxProps) => {
    const dispatch = useDispatch<AppDispatch>();

    React.useEffect(() => {
        if (!company) dispatch(getCompany(user?.CompanyId));
    }, []);

    // @ts-ignore
    const { tab } = useParams();

    const currentTab = React.useMemo(() => tab || 'about', [tab]);

    return isLoading ? (
        <Loader />
    ) : (
        <React.Fragment>
            <PageTitle title={user?.CompanyName} />
            <Tabs root="/lk/" list={tabList} active={currentTab} />
            {LkRoutes(currentTab, user)}
        </React.Fragment>
    );
};

const LkRoutes = (currentTab: string, user: IUserData | null) => {
    switch (currentTab) {
        case 'about':
            return <About />;
        case 'users':
            return <UserList />;
        case 'test_features':
            return <TestFeatures />;
        default:
            console.log('currentTab', currentTab);
            return null;
    }
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    const { company, isLoading } = lkSelector(state);
    return { user, company, isLoading };
};

const connector = connect(mapStateToProps);
type LkReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Lk);
