import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

export const useFooterStyles = makeStyles((theme) => ({
    footer: {
        position: 'relative',
        zIndex: 11,
        padding: theme.spacing(3.5, 0),
        background: '#fff',
        [theme.breakpoints.down('lg')]: {
            padding: theme.spacing(2.5, 0),
        },
        [theme.breakpoints.down('md')]: {
            padding: theme.spacing(1.5, 0),
        },
    },
    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contact: {
        lineHeight: `${theme.spacing(4)}`,
    },
    social: {
        display: 'flex',
        alignItems: 'center',
    },

    footerLight: {
        padding: theme.spacing(3.5, 11),
        //color: '#fff',
        //background: 'rgba(0, 0, 0, 0.5)',
        borderTop: '1px solid rgba(255, 255, 255, 0.3)',
    },
}));
