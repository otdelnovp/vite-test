import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useTabsStyles = makeStyles((theme) => ({
    tabs: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        marginBottom: theme.spacing(8),
        borderBottom: `1px solid ${theme.palette.divider}`,
        [theme.breakpoints.down('lg')]: {
            marginBottom: theme.spacing(5),
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(3),
        },
    },
    item: {
        marginRight: theme.spacing(6),
        marginBottom: -1,
        padding: theme.spacing(1.5, 0),
        borderBottom: '2px solid transparent',
        color: theme.palette.text.primary,
        transition: 'color 300ms, border 1000ms',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
    active: {
        color: theme.palette.primary.main,
        borderBottomColor: theme.palette.primary.main,
    },
}));
