import { makeStyles } from '@mui/styles';

import { greyTextColor } from '@theme/main';

import { globalThemeMUI } from '@theme/main';

export const useDashboardTileStyles = makeStyles((theme) => ({
    boxHorizontal: {
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    },
    verticalLine: {
        backgroundColor: globalThemeMUI.palette.mode === 'dark' ? globalThemeMUI.palette.primary.dark : theme.palette.primary.main,
        width: theme.spacing(0.6),
        borderRadius: theme.spacing(0.3),
        margin: `0 ${theme.spacing(1)} 0 0`,
    },
    divider: {
        margin: 0,
        width: theme.spacing(3),
    },
    tileTitle: {
        margin: `0 0 ${theme.spacing(1)} 0 `,
        color: globalThemeMUI.palette.mode === 'dark' ? globalThemeMUI.palette.primary.dark : theme.palette.primary.main,
    },
    boxValue: {},
    value: {
        color: globalThemeMUI.palette.mode === 'dark' ? globalThemeMUI.palette.primary.dark : theme.palette.primary.main,
        margin: 0,
    },
    description: {
        margin: 0,
        color: greyTextColor,
        fontWeight: 'bold',
    },
}));

