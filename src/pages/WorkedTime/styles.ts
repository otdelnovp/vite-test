import { FullscreenExit } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '5px',
    },
    filter: {
        marginBottom: theme.spacing(5),
    },
    calendarTable: {
        border: '1px solid #ccc',
        maxHeight: 600,
        borderRadius: 2,
        '& table': {
            maxHeight: 500,
            userSelect: 'none',
        },
        '& td, & th': {
            padding: theme.spacing(1.5, 1),
            border: '1px solid #ddd',
            borderLeftWidth: 0,
            borderTopWidth: 0,
            textAlign: 'center',
            minWidth: theme.spacing(5),
        },
        '& td:first-child': {
            textAlign: 'left',
            fontWeight: 'bold',
            borderRightWidth: 2,
        },
        '& th': {
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            borderBottomWidth: 1,
            top: '3.3em !important',
        },
        '& tr:first-child th': {
            borderRightWidth: 2,
            top: '0 !important',
        },
        '& th:nth-child(7n)': {
            borderRightWidth: 2,
        },
        '& td:nth-child(7n + 2)': {
            borderRightWidth: 2,
        },
        '& th:last-child, & td:last-child': {
            borderRightWidth: '1px !important',
        },
        '& td:nth-child(1n + 2)': {
            cursor: 'pointer',
        },
    },
    spacerCell: {
        cursor: 'default !important',
    },
    departmentCell: {
        borderTopWidth: '1px !important',
        color: `${theme.palette.primary.main} !important`,
    },
    selectedCell: {
        background: `${theme.palette.primary.light} !important`,
        color: 'white !important',
        boxShadow: 'inset 3px 3px 3px rgba(0,0,0,0.1)',
    },
    userInfo: {
        margin: theme.spacing(0, 0, 3),
    },
    userInfoRow: {
        margin: theme.spacing(0, 0, 1),
    },
    userInfoLabel: {
        fontSize: '0.9em',
        opacity: 0.8,
    },
    userInfoValue: {
        fontSize: '1.1em',
        fontWeight: 'bold',
    },
    userInfoName: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    listAction: {
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },
    submitLoadingButton: {
        marginLeft: theme.spacing(1),
    },
}));

export const sx = {
    dateDialogPaper: {
        marginTop: '32px',
    },
    dateDialogTable: {
        borderBottom: 'none',
    },
    divider: {
        margin: '32px 0 32px 32px',
    },
    h6: {
        marginBottom: '12px',
        fontWeight: 'bold',
        fontSize: '1.2em',
        color: '#14467B',
    },
    th: {
        fontWeight: 'bold',
    },
    thButtons: {
        width: '120px',
    },
    thRow: {
        height: '40px',
    },
    dayCell: {
        fontSize: '0.8em',
        transition: 'background 300ms',
        '&:hover': {
            background: '#F3F6F8 !important',
        },
    },
};

