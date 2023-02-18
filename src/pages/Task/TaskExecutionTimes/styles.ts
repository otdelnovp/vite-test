import { makeStyles } from '@mui/styles';

export const useExecutionTimeStyles = makeStyles((theme) => ({
    executionTimes: {
        margin: theme.spacing(2, 0, 0),
    },
    executionTimeList: {
        margin: theme.spacing(0, 0, 3),
    },
    executionTimeItem: {
        position: 'relative',
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(4),
    },
    executionTimeItemQuote: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 55,
        lineHeight: 0.9,
        fontFamily: 'Arial, Helvetica, sans-serif',
        opacity: 0.3,
    },

    executionTimeItemIcon: {
        position: 'absolute',
        top: 0,
        left: 0,
        fontSize: 18,
        lineHeight: 1.1,
        opacity: 0.7,
    },

    executionTimeInfo: {
        marginBottom: theme.spacing(1),
    },
    executionTimeDate: {
        fontSize: '0.85em',
        color: theme.palette.text.secondary,
    },
    executionTimeUserName: {
        fontWeight: 'bold',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    executionTimeEditIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary,
        cursor: 'pointer',
    },
    executionTimeComment: {
        fontStyle: 'italic',
    },

    executionTimeContent: {
        '& span': {
            color: theme.palette.text.secondary,
            fontSize: '0.85em',
        },
    },

    executionTimeForm: {
        marginTop: theme.spacing(3),
        paddingLeft: theme.spacing(4),
    },
    executionTimeInput: {
        marginBottom: theme.spacing(2),
        '& .ql-toolbar': {
            borderRadius: theme.spacing(2, 2, 0, 0),
        },
        '& .ql-container': {
            borderRadius: theme.spacing(0, 0, 2, 2),
        },
    },
}));
