import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const usePageTitleStyles = makeStyles((theme) => ({
    pageTitle: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('lg')]: {
            marginBottom: theme.spacing(2),
        },
        [theme.breakpoints.down('md')]: {
            marginBottom: theme.spacing(1.5),
        },
    },
    title: {
        marginRight: theme.spacing(1.5),
    },
}));
