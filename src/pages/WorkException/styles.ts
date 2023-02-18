import { makeStyles } from '@mui/styles';

export const useWorkExceptionStyles = makeStyles((theme) => ({
    root: {},
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
        '& td:nth-child(7n + 1)': {
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
    activeCell: {
        background: '#F3F6F8',
    },
    selectedCell: {
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
}));
