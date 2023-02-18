import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useRestorePasswordStyles = makeStyles((theme) => ({
    content: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            marginTop: 0,
        },
    },

    restore: {
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

    restoreInput: {
        display: 'flex',
        alignItems: 'flex-end',
    },

    restoreMode: {
        marginLeft: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    successMail: {
        margin: theme.spacing(10, 0, 10),
        textAlign: 'center',
        color: theme.palette.primary.main,
    },
    successMailIcon: {
        fontSize: '4em',
        marginBottom: theme.spacing(1),
    },
}));
