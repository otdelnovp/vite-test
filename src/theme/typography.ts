import lightPalette from './lightPalette';
import darkPalette from './darkPalette';

export default (darkMode?: boolean) => ({
    h1: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 500,
        fontSize: '1.6em',
        lineHeight: 1.6,
        letterSpacing: '-0.24px',
    },
    h2: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 500,
        fontSize: '1.5em',
        lineHeight: 1.4,
        letterSpacing: '-0.24px',
    },
    h3: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 500,
        fontSize: '1.4em',
        lineHeight: 1.6,
        letterSpacing: '-0.06px',
    },
    h4: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 500,
        fontSize: '1.2em',
        lineHeight: 1.4,
    },
    h5: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 700,
        fontSize: '1.1em',
        lineHeight: 1.4,
    },
    h6: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontWeight: 700,
        fontSize: '1.05em',
        lineHeight: 1.4,
    },
    subtitle1: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontSize: '16px',
        lineHeight: '25px',
    },
    subtitle2: {
        color: !darkMode ? lightPalette.text.secondary : darkPalette.text.secondary,
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '21px',
    },
    body1: {
        color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        fontSize: '1em',
        lineHeight: 1.4,
    },
    body2: {
        color: !darkMode ? lightPalette.text.secondary : darkPalette.text.secondary,
        fontSize: 'inherit',
        lineHeight: 1.4,
    },
    caption: {
        color: !darkMode ? lightPalette.text.secondary : darkPalette.text.secondary,
        fontSize: '0.9em',
        lineHeight: 1.1,
    },
    overline: {
        color: !darkMode ? lightPalette.text.secondary : darkPalette.text.secondary,
        fontWeight: 500,
        fontSize: '0.9em',
        lineHeight: 1.1,
        letterSpacing: '0.33px',
        textTransform: 'uppercase' as const,
    },
});

