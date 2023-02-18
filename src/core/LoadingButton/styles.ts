import { makeStyles } from '@mui/styles';
import { globalThemeMUI } from '@theme/main';
import { green, red } from '@mui/material/colors';

export const useButtonStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: theme.palette.success.main,
        '&:hover': {
            backgroundColor: green[700],
        },
    },
    buttonFailure: {
        backgroundColor: theme.palette.error.main,
        '&:hover': {
            backgroundColor: red[700],
        },
    },
    fabProgress: {
        color: theme.palette.success.main,
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonProgress: {
        color: theme.palette.success.main,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
