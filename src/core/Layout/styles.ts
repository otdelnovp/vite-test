import { makeStyles } from '@mui/styles';

export const useLayoutStyles = makeStyles((theme) => ({
    page: {
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        // overflowX: 'auto',
        // overflowY: 'auto',
        width: '100%',
    },
    content: {
        flex: '1 0 auto',
        // overflow: 'hidden',
        padding: theme.spacing(12, 4, 4),
        minHeight: '50vh',
        maxWidth: `calc(100vw - ${theme.spacing(8)})`,
        // [theme.breakpoints.down('lg')]: {
        //     paddingTop: theme.spacing(3),
        //     paddingBottom: theme.spacing(3),
        // },
        // [theme.breakpoints.down('md')]: {
        //     paddingTop: theme.spacing(2),
        //     paddingBottom: theme.spacing(2),
        // },
    },
    contentLight: {
        paddingTop: theme.spacing(4),
    },
    drawerbox: {
        display: 'flex',
        flexDirection: 'row',
    },
}));
