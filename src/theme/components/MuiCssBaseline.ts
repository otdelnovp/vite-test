import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export default (darkMode?: boolean) => ({
    styleOverrides: {
        html: {
            position: 'relative' as const,
            width: '100%',
            height: '100%',
        },
        body: {
            position: 'relative' as const,
            width: '100%',
            height: '100%',
            minWidth: '320px',
            fontSize: scaleTheme.spacing(1.75),
            [scaleTheme.breakpoints.down('lg')]: {
                fontSize: scaleTheme.spacing(1.7),
            },
            [scaleTheme.breakpoints.down('md')]: {
                fontSize: scaleTheme.spacing(1.5),
            },
            overflowX: 'hidden',
            textRendering: 'optimizeSpeed',
            textSizeAdjust: '100%',
            WebkitFontSmoothing: 'antialiased',
            MozFontSmoothing: 'grayscale',
        },
        a: {
            color: !darkMode ? lightPalette.link : darkPalette.link,
            textDecoration: 'none',
            transition: 'background 300ms, color 300ms, opacity 300ms, border 300ms',
        },
        p: {
            margin: scaleTheme.spacing(0, 0, 1),
        },
    },
});

