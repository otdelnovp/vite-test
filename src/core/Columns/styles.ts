import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { greyColor } from '@theme/main';

export const useColumnsStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            display: 'block',
        },
    },
    reverse: {
        flexDirection: 'row-reverse',
    },
    aside: {
        position: 'relative',
        flexBasis: theme.spacing(38),
        marginRight: theme.spacing(8),
        [theme.breakpoints.down('md')]: {
            width: '100%',
            padding: theme.spacing(2),
            marginBottom: theme.spacing(4),
        },
    },
    asideSmall: {
        flexBasis: theme.spacing(30),
    },
    asideBg: {
        paddingRight: theme.spacing(8),
        background: '#fff',
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            width: '50vw',
            minHeight: '81vh',
            top: `-${theme.spacing(4)}`,
            bottom: `-${theme.spacing(4)}`,
            right: 0,
            background: '#fff',
            boxShadow: `inset 0 2px 2px -1px ${greyColor}, inset 0 -2px 2px -1px ${greyColor}`,
            [theme.breakpoints.down('lg')]: {
                top: `-${theme.spacing(3)}`,
                bottom: `-${theme.spacing(3)}`,
            },
            [theme.breakpoints.down('md')]: {
                display: 'none',
            },
        },
    },
    asideReverse: {
        marginRight: 0,
        marginLeft: theme.spacing(7),
        '&$asideBg': {
            paddingRight: 0,
            paddingLeft: theme.spacing(6),
            '&:before': {
                left: 0,
                right: 'auto',
            },
        },
    },
    content: {
        flex: '1 0 0',
    },
}));
