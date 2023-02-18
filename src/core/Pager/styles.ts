import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';
import { primaryColor, lightBlueColor, blackColor } from '@theme/main';

export const usePagerStyles = makeStyles((theme) => ({
    pager: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(3, 0, 0),
    },

    list: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        color: theme.palette.primary.main,
        fontSize: '1.3em',
    },

    item: {
        padding: theme.spacing(1, 1),
        cursor: 'pointer',
        userSelect: 'none',
        '&:hover': {
            //color: lightBlueColor,
        },
    },
    arrow: {
        padding: theme.spacing(1, 0.5),
        cursor: 'pointer',
        userSelect: 'none',
        '& .MuiSvgIcon-root': {
            display: 'block',
        },
        '&:hover': {
            //color: lightBlueColor,
        },
    },

    current: {
        display: 'inline-block',
        fontWeight: 700,
        pointerEvents: 'none',
        //color: blackColor,
    },

    divider: {
        margin: theme.spacing(0, 1.5),
    },
    count: {
        marginLeft: theme.spacing(3),
    },
}));
