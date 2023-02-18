import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export default (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            marginRight: 0,
            color: !darkMode ? lightPalette.icon : darkPalette.icon,
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
            },
        },
    },
});

