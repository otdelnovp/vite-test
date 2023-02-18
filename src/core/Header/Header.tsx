import React, { useCallback, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { useCookies } from 'react-cookie';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

import { RootState } from '@services/index';
import { userSelector, setUser, logout, setDarkMode } from '@services/userService';
import { resetDictionaries } from '@services/dictionaryService';

import { isAuthorized, IUserData } from '@helpers/authHelper';

import { useHeaderStyles } from './styles';

import logo from '@images/logo_outstroked.svg';
import defaultAvatar from '@images/avatar.png';

import { theme } from '@theme/index';
import clsx from 'clsx';

interface IHeader {
    openSidebar: boolean;
}
const Header = ({ user, darkMode, openSidebar }: HeaderReduxProps) => {
    const classes = useHeaderStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const light = !user && location?.pathname === '/';

    const [cookie, , removeCookie] = useCookies();

    const logoutFromApp = () => {
        removeCookie('user');
        dispatch(resetDictionaries());
        dispatch(logout());
        navigate('/');
    };

    const onSetUser = useCallback((currentUser: IUserData) => dispatch(setUser(currentUser)), [cookie?.user]);
    useEffect(() => {
        if (cookie?.user) onSetUser(cookie?.user);
    }, []);

    const onDarkModeChange = () => {
        dispatch(setDarkMode({ darkMode: !darkMode }));
    };

    const userMenu = React.useMemo(
        () => (
            <Box component="div" className={classes.userMenu}>
                <Paper>
                    <MenuList>
                        <MenuItem>
                            <FormControlLabel control={<Switch checked={darkMode} onChange={onDarkModeChange} />} label="Темная тема" />
                        </MenuItem>
                        <Divider />
                        <MenuItem component={Link} to="/lk">
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            Личный кабинет
                        </MenuItem>
                        <MenuItem onClick={logoutFromApp} component={Link} to="/">
                            <ListItemIcon>
                                <ExitToAppIcon color={'secondary'} />
                            </ListItemIcon>
                            Выход
                        </MenuItem>
                    </MenuList>
                </Paper>
            </Box>
        ),
        [user, darkMode],
    );

    const userPanel = user ? (
        <Box component="div" className={classes.userPanel}>
            <div className={classes.user} aria-controls="user-menu" aria-haspopup="true">
                <img className={classes.userAvatar} src={defaultAvatar} alt={user.UserName} />
                <div className={classes.userInfo}>
                    <div className={classes.userName}>{user.FullName}</div>
                </div>
                <ArrowDropDownIcon fontSize="small" />
            </div>
            {userMenu}
        </Box>
    ) : null;

    return !light ? (
        <Box component="div" className={clsx(classes.header, { [classes.openSidebar]: openSidebar }, { [classes.noSidebar]: !isAuthorized(user) })}>
            <AppBar position="static" elevation={0} sx={{ background: theme(darkMode).palette.primary.main }}>
                <Container maxWidth={false}>
                    <Toolbar className={classes.toolbar}>
                        {/* < DrawerMainMenu /> */}
                        <Link to="/" className={classes.logo}>
                            <img src={logo} alt="Kamotive" />
                        </Link>
                        {isAuthorized(user) && (
                            <nav className={classes.nav}>
                                {/* 
                            {isCustomer(user) && (
                                <NavLink to="/tasks/new/" className={(navData) => (navData.isActive ? classes.navActive : '')}>
                                    Создать заявку
                                </NavLink>
                            )} */}
                                {/* <NavLink to="/finance" activeClassName={classes.navActive}>
                                Финансы
                            </NavLink> */}
                            </nav>
                        )}
                        {isAuthorized(user) && userPanel}
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    ) : null;
};

const mapStateToProps = (state: RootState) => {
    const { user, darkMode } = userSelector(state);
    return { user, darkMode };
};

const connector = connect(mapStateToProps);
type HeaderReduxProps = ConnectedProps<typeof connector> & IHeader;

export default compose(connector)(Header);
