import { makeStyles } from '@mui/styles';
import { Theme, CSSObject } from '@mui/material/styles';

export const useDrawerStyles = makeStyles((theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: theme.spacing(0, 1.5),
        ...theme.mixins.toolbar,
    },
    drawer: {},
    drawerFragment: {
        //color: '#fff',
        background: theme.palette.primary.main,
    },
    burgerToolbar: {
        display: 'flex',
    },
}));

export const listItemStyle = (active: boolean) => ({
    display: 'block',
    background: active ? 'rgba(20, 70, 123, 0.1)' : 'unset',
});

export const listItemButtonStyle = (open: boolean, disabled: boolean) => ({
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    px: 2,
    pointerEvents: disabled ? 'none' : 'all',
    opacity: disabled ? 0.4 : 1,
});

export const listItemIconStyle = (open: boolean) => ({
    minWidth: 0,
    mr: open ? 3 : 'auto',
    justifyContent: 'center',
    '& svg': {
        fontSize: '30px',
    },
});

export const iconButtonStyle = (open: boolean) => ({
    color: 'white',
    margin: '0 auto',
    left: 0,
    ...(open && { display: 'none' }),
});

export const drawerWidth = 280;

const openedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme, drawerWidth: number): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
    '&::-webkit-scrollbar': {
        width: '1px',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.primary.main,
    },
});

export const appBarStyle = (theme: Theme, open: boolean) => ({
    width: `calc(${theme.spacing(8)} + 1px)`,
    zIndex: theme.zIndex.drawer + 1,
    left: 0,
    alignItems: 'center',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: 0,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
});

export const drawerStyle = (theme: Theme, open: boolean) => ({
    width: drawerWidth,
    flexShrink: 0,
    // whiteSpace: 'nowrap',
    // boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme, drawerWidth),
        '& .MuiDrawer-paper': openedMixin(theme, drawerWidth),
    }),
    ...(!open && {
        ...closedMixin(theme, drawerWidth),
        '& .MuiDrawer-paper': closedMixin(theme, drawerWidth),
    }),
});
