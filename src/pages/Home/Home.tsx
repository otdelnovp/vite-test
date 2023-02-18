import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { isAuthorized } from '@helpers/authHelper';
import { userSelector } from '@services/userService';
import { RootState } from '@services/index';

import { sidebarItems } from '@core/Sidebar/sidebarItems';
import DashboardTile from '@core/DasboardTile/DashboardTile';

import Guest from '@pages/Home/Guest';

import { useHomeStyles } from './styles';
import { globalThemeMUI } from '@theme/main';

const Home = ({ user }: HomeReduxProps) => {
    const classes = useHomeStyles();

    if (!isAuthorized(user)) return <Guest />;

    return (
        <Box className={classes.dashboard}>
            <Box className={classes.dashboardTiles}>
                <DashboardTile title="Работы" />
                <DashboardTile title="Задания" />
                <DashboardTile title="Задачи" />
            </Box>
            <Box className={classes.menuItems}>
                {sidebarItems.map((sidebarItem) => {
                    return (
                        <Link to={sidebarItem.href} className={sidebarItem.disabled ? classes.menuItemDisabled : undefined} key={sidebarItem.type}>
                            <Button
                                key={sidebarItem.href}
                                className={classes.menuItem}
                                sx={{
                                    '& svg, p': { ...(globalThemeMUI.palette.mode === 'dark' && { color: globalThemeMUI.palette.primary.light }) },
                                }}
                                disabled={sidebarItem.disabled}
                            >
                                {sidebarItem.icon}
                                <span>{sidebarItem.title}</span>
                            </Button>
                        </Link>
                    );
                })}
            </Box>
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type HomeReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Home);
