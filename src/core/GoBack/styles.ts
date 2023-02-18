import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useGoBackStyles = makeStyles((theme) => ({
    goBack: {
        display: 'inline-flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
        color: 'inherit',
        '&:hover': {
            opacity: 0.7,
        },
        [theme.breakpoints.down('lg')]: {
            marginBottom: theme.spacing(2.5),
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(2),
        },
    },
    title: {
        marginLeft: theme.spacing(1),
    },
}));
