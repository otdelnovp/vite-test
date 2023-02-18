import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export default (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            textTransform: 'none' as const,
            boxSizing: 'border-box' as const,
            boxShadow: 'none',
            padding: scaleTheme.spacing(1.444, 4),
            borderRadius: '0.8em',
            border: 'none',
            transition: 'background 300ms, color 300ms, opacity 300ms',
            '&:hover': {
                opacity: '95%',
            },
            // '&:active': {
            //     background: `${!darkMode ? lightPalette.primary.dark : darkPalette.primary.dark} !important`,
            // },
        },
        sizeSmall: {
            fontSize: '0.9rem',
            padding: scaleTheme.spacing(0.9, 4),
        },
        sizeLarge: {
            fontSize: '0.95rem',
            padding: scaleTheme.spacing(1.875, 4),
        },
        contained: {
            boxShadow: 'none',
            '&:hover, &:active': {
                backgroundColor: !darkMode ? lightPalette.primary.main : darkPalette.primary.main,
                opacity: 0.8,
                boxShadow: 'none',
            },
        },
        outlined: {
            border: `1px solid ${!darkMode ? lightPalette.primary.dark : darkPalette.primary.dark}`,
            padding: scaleTheme.spacing(1.2, 4),
            borderRadius: '0.8em',
        },
    },
});

