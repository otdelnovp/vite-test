import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';

import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

import { globalThemeMUI } from '@theme/main';

import { sidebarItems } from './sidebarItems';

import {
    useDrawerStyles,
    listItemStyle,
    listItemButtonStyle,
    listItemIconStyle,
    iconButtonStyle,
    appBarStyle,
    drawerStyle,
    drawerWidth,
} from './styles';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => appBarStyle(theme, !!open));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => drawerStyle(theme, !!open));

interface ISidebar {
    onOpen: (newState: boolean) => void;
}
const Sidebar = ({ onOpen }: ISidebar) => {
    const classes = useDrawerStyles();
    const location = useLocation();
    const currentLocation = location.pathname.split('/').splice(1, 1).pop();

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        onOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
        onOpen(false);
    };

    const list = () => (
        <Box
            component="div"
            sx={{
                width: drawerWidth,
            }}
            role="presentation"
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
        >
            <Box component="div" className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </Box>
            <Divider style={{ marginTop: -1 }} />
            <List>
                {sidebarItems.map((sidebarItem, index) => {
                    return (
                        <ListItem
                            key={sidebarItem.href}
                            component={Link}
                            to={sidebarItem.disabled ? '#' : sidebarItem.href}
                            disablePadding
                            sx={listItemStyle(`/${currentLocation}` === sidebarItem.href)}
                        >
                            <ListItemButton sx={listItemButtonStyle(open, sidebarItem.disabled)}>
                                <ListItemIcon sx={listItemIconStyle(open)}>{sidebarItem.icon}</ListItemIcon>
                                <ListItemText primary={sidebarItem.title} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <div>
            <Box component="div" className={classes.drawerFragment}>
                <AppBar position="fixed" open={open}>
                    <Toolbar className={classes.burgerToolbar}>
                        <IconButton aria-label="Главное меню" onClick={handleDrawerOpen} edge="start" sx={iconButtonStyle(open)}>
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} onClose={handleDrawerClose}>
                    {list()}
                </Drawer>
            </Box>
        </div>
    );
};

export default Sidebar;

