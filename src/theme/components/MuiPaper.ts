import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';

export default (darkMode?: boolean) => ({
    styleOverrides: {
        rounded: {
            borderRadius: scaleTheme.spacing(2),
        },
        elevation: {
            background: !darkMode ? lightPalette.white : '#5D5E5F',
            boxShadow: !darkMode ? '0 3px 20px rgba(155, 166, 178, 0.25)' : '0 2px 15px rgba(150, 150, 150, 0.4)',
        },
    },
});

