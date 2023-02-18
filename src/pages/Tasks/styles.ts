import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { greyTextColor, primaryColor, greyColor } from '@theme/main';

export const useTaskPageStyles = makeStyles((theme) => ({
    header: {
        position: 'relative',
        zIndex: 11,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tools: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    newButton: {
        marginRight: theme.spacing(2),
    },
    toggleMode: {
        marginLeft: theme.spacing(2),
    },
}));

export const useTaskListStyles = makeStyles((theme) => ({
    list: {
        // margin: theme.spacing(-2, 0, 0),
        [theme.breakpoints.down('lg')]: {
            margin: 0,
        },
    },
}));

export const useTaskListItemStyles = makeStyles((theme) => ({
    task: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        margin: theme.spacing(0, 0, 1),
        padding: theme.spacing(2, 3),
        borderRadius: theme.spacing(2),
        background: '#fff',
        boxShadow: '0 3px 20px rgba(155,166,178, 0.25)',
    },

    number: {
        fontSize: '1.2em',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginRight: theme.spacing(2),
    },

    title: {
        fontSize: '1.1em',
    },

    action: {
        textAlign: 'right',
    },

    forward: {
        display: 'block',
        position: 'absolute',
        top: '50%',
        right: 0,
        margin: theme.spacing(0.5, 2),
        transform: 'translateY(-50%)',
        color: 'inherit',
        '&:hover': {
            color: primaryColor,
        },
    },
}));

export const useTaskFinderStyles = makeStyles((theme) => ({
    filter: {
        marginBottom: theme.spacing(5),
    },
    helper: {
        position: 'absolute',
        zIndex: 1,
        top: '50%',
        left: '66%',
        transform: 'translate(-50%, -50%)',
        fontSize: '1.2em',
        textAlign: 'center',
        opacity: 0.3,
        whiteSpace: 'nowrap',
    },
    helperArrow: {
        position: 'absolute',
        top: '50%',
        right: '100%',
        fontSize: '1.5em',
        transform: 'translate(-1em, -50%)',
    },
}));
