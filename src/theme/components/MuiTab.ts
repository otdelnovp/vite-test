import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export const MuiTab = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            color: !darkMode ? lightPalette.primary.main : darkPalette.primary.main,
            opacity: 0.7,
            minWidth: 0,
            minHeight: 0,
            padding: scaleTheme.spacing(1, 3),
            textTransform: 'none' as const,
            maxWidth: 'none',
        },
    },
});

export const MuiTabs = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            minHeight: 0,
            width: 'fit-content',
        },
        indicator: {
            height: scaleTheme.spacing(0.25),
            background: !darkMode ? lightPalette.primary.main : darkPalette.primary.main,
        },
    },
});

