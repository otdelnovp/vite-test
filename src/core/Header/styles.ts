import { makeStyles } from '@mui/styles';
//import { globalThemeMUI } from '@theme/main';

export const useGuestHeaderStyles = makeStyles((theme) => ({
    header: {
        zIndex: 11,
        background: theme.palette.primary.main,
    },

    toolbar: {
        flexWrap: 'wrap',
        paddingLeft: theme.spacing(3.5, 0),
        paddingRight: theme.spacing(3.5, 0),
        paddingTop: 0,
        paddingBottom: 0,
    },

    logo: {
        display: 'flex',
        height: theme.spacing(7),

        '& img': {
            display: 'block',
            margin: `auto ${theme.spacing(1.5)}`,
            maxWidth: '100%',
            maxHeight: '60%',
        },
    },
}));

export const useHeaderStyles = makeStyles((theme) => ({
    header: {
        zIndex: 120,
        position: 'fixed',
        left: theme.spacing(8),
        right: 0,
        background: theme.palette.primary.main,
        transition: 'left 200ms',
    },
    openSidebar: {
        left: theme.spacing(35),
    },
    noSidebar: {
        left: 0,
    },
    toolbar: {
        flexWrap: 'wrap',
        paddingLeft: theme.spacing(3.5, 0),
        paddingRight: theme.spacing(3.5, 0),
        paddingTop: 0,
        paddingBottom: 0,
    },

    logo: {
        display: 'flex',
        height: theme.spacing(7),

        '& img': {
            display: 'block',
            margin: `auto ${theme.spacing(1.5)}`,
            maxWidth: '100%',
            maxHeight: '60%',
        },
    },

    nav: {
        flexGrow: 1,
        marginLeft: theme.spacing(8),
        '& a': {
            display: 'inline-block',
            marginRight: theme.spacing(6),
            lineHeight: `${theme.spacing(4)}`,
            color: theme.palette.text.primary,
            borderBottom: '2px solid transparent',
            '&:hover': {
                color: theme.palette.primary.main,
            },
        },
    },
    navActive: {
        color: `${theme.palette.primary.main} !important`,
        borderBottomColor: `${theme.palette.primary.main} !important`,
    },

    menu: {
        display: 'flex',
        alignItems: 'center',
        color: theme.palette.primary.contrastText,
    },
    menuItem: {
        marginLeft: theme.spacing(1),
        textTransform: 'uppercase',
        '&:first-child': {
            marginLeft: '0',
        },
        '& a': {
            color: 'inherit !important',
            cursor: 'pointer',
            '&:hover': {
                opacity: 0.7,
            },
        },
    },
    menuIcon: {
        color: theme.palette.primary.contrastText,
        transition: 'color 300ms, opacity 300ms',
        '&:hover': {
            opacity: 0.7,
        },
    },

    userPanel: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        marginLeft: theme.spacing(5),
        padding: theme.spacing(0.35, 0),
        '&:hover $userMenu': {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)',
        },
    },
    userMenu: {
        position: 'absolute',
        top: '99.99%',
        right: -20,
        opacity: 0,
        visibility: 'hidden',
        transform: 'translateY(10px)',
        transition: 'opacity 300ms, visibility 300ms, transform 300ms',
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            bottom: '99%',
            right: 22,
            border: '8px solid transparent',
            borderBottomColor: '#fff',
        },
    },

    user: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    userAvatar: {
        display: 'block',
        width: theme.spacing(4),
        borderRadius: '50%',
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            marginRight: theme.spacing(1.5),
        },
    },
    userInfo: {
        maxWidth: theme.spacing(20),
        marginRight: theme.spacing(0.5),
        overflow: 'hidden',
    },
    userName: {},
    userPosition: {
        fontSize: '0.7em',
    },
}));
