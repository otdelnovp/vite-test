import { makeStyles } from '@mui/styles';
//import { theme } from '@theme/main';

import guestBgLight from '@images/auth_back_light.svg';
import guestBgDark from '@images/auth_back_dark.svg';
import { theme } from '@theme/main';

export const useGuestStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: `100%`,
        minHeight: '100vh',
        width: '100vw',
        color: theme.palette.background.default,
        //color: theme.palette.text.primary,
        //backgroundColor: theme.palette.background.default,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#2a2a2a',
        backgroundImage: theme.palette.mode === 'light' ? `url(${guestBgLight})` : `url(${guestBgDark})`,
        backgroundRepeat: 'no-repeat',
        //backgroundPosition: '100%',
        backgroundSize: 'cover',
        overflow: 'hidden',
        flexDirection: 'column',
    },
    login_wrapper: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
    },
}));

export const useHomeStyles = makeStyles(() => ({
    dashboard: {},
    dashboardTiles: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuItems: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuItem: {
        padding: theme.spacing(1),
        width: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        '& svg': {
            marginBottom: theme.spacing(1),
            fontSize: theme.spacing(8),
        },
        '& span': {
            lineHeight: '1.3',
        },
    },
    menuItemDisabled: {
        pointerEvents: 'none',
        '& svg': {
            color: '#ccc',
        },
        '& p': {
            color: '#ccc',
        },
    },
}));
