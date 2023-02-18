import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useLoginStyles = makeStyles((theme) => ({
    content: {
        maxWidth: theme.spacing(80),
        padding: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '0 auto',
        [theme.breakpoints.down('lg')]: {
            marginTop: theme.spacing(3),
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        },
    },

    login: {
        padding: '30px 60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },

    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },

    loginInput: {
        display: 'flex',
        alignItems: 'flex-end',
    },

    loginMode: {
        marginLeft: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    formLight: {
        '& $remember': {
            color: theme.palette.primary.main,
        },
        '& $loginMode .MuiToggleButton-root': {
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
        },
        '& $loginMode .MuiToggleButton-root.Mui-selected': {
            color: 'white',
            borderColor: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.main,
        },
    },
    remember: {},
}));
