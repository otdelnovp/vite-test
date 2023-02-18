import { makeStyles } from '@mui/styles';
import { theme } from '@theme/main';

export const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: '8px',
        border: '1px solid #ccc',
        maxHeight: 600,
        borderRadius: 2,
        '& table': {
            maxHeight: 500,
            userSelect: 'none',
            borderBottomWidth: '0px !important',
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
            paddingLeft: theme.spacing(2),
            textAlign: 'left',
            borderRightWidth: 2,
        },
        '& th': {
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            borderBottomWidth: 1,
            background: theme.palette.background.paper,
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
    },
}));

export const sx = {
    reportTable: {
        marginTop: theme.spacing(3),
    },
    reportTableHeader: {
        marginBottom: theme.spacing(1),
        fontWeight: 'bold',
    },
    th: {
        fontWeight: 'bold',
    },
    thRow: {
        height: '40px',
    },
    tRow: {
        height: '54px',
    },
    taskCell: {
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    clickableCell: {
        cursor: 'pointer',
        transition: 'background 300ms',
        '&:hover': {
            background: '#F9FAFB',
        },
    },
    selectedDate: {
        background: '#F3F6F8',
    },
    bottomTable: {
        marginTop: theme.spacing(2),
    },
    taskAdderBox: {
        display: 'flex',
        flexDirection: 'row',
    },
    taskAdderInput: {
        width: '480px',
    },
    taskAdderBtn: {
        marginLeft: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
    },
};

