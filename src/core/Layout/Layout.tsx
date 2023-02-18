import React, { useState } from 'react';
import clsx from 'clsx';

import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { isAuthorized, IUserData } from '@helpers/authHelper';
import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import Box from '@mui/material/Box';

import ErrorBoundaries from '@core/ErrorBoundaries/ErrorBoundaries';
import AlertContainer from '@core/Alert/Alert';

import Header from '@core/Header/Header';
import SidebarMenu from '../Sidebar/Sidebar';

import { useLayoutStyles } from './styles';

export interface ILayout extends LayoutReduxProps {
    children: any;
    hideMenu: boolean;
}

const Layout: React.FC<ILayout> = ({ children, hideMenu, user }: ILayout) => {
    const classes = useLayoutStyles();
    const [openSidebar, setOpenSidebar] = useState(false);
    return (
        <ErrorBoundaries>
            <Box component="div" className={classes.drawerbox}>
                {isAuthorized(user) && !hideMenu && <SidebarMenu onOpen={setOpenSidebar} />}
                <Box component="div" className={classes.page}>
                    {!hideMenu && <Header openSidebar={openSidebar} />}
                    <Box component="div" className={clsx(classes.content, { [classes.contentLight]: hideMenu })}>{children}</Box>
                </Box>
            </Box>
            <AlertContainer />
        </ErrorBoundaries>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type LayoutReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Layout);
