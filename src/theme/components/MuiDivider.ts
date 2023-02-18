import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export default (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            borderColor: !darkMode ? lightPalette.border : darkPalette.border,
        },
    },
});

