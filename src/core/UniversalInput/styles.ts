import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useUniversalInputStyles = makeStyles((theme) => ({
    root: {
        height: '1.186em',
    },
    mapField: {
        marginTop: theme.spacing(1),
        height: '400px',
    },
    mapSection: {
        marginTop: theme.spacing(1),
        height: '700px',
    },
    filterLabel: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
    filterExpand: {
        textAlign: 'right',
        cursor: 'pointer',
    },
}));

export const useAutocompleteStyles = makeStyles((theme) => ({
    addButton: {
        marginTop: theme.spacing(1),
    },
}));
