import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useLkStyles = makeStyles((theme) => ({
    editButton: {
        float: 'right',
        marginTop: theme.spacing(5),
    },
    editForm: {},

    filters: {
        padding: theme.spacing(4, 4, 2),
        // fontSize: '0.85em',
    },
    filtersForm: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'row',
        '& > .MuiFormControl-root': {
            marginRight: theme.spacing(2),
        },
    },
    list: {},
    listAction: {
        cursor: 'pointer',
        marginLeft: theme.spacing(2),
        color: theme.palette.primary.main,
        opacity: 0.8,
        '&:hover': {
            opacity: 1,
        },
    },

    footer: {
        padding: theme.spacing(0, 4, 3),
    },
}));
