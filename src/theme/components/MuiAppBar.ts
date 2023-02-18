import lightPalette from '../lightPalette';

export default {
    styleOverrides: {
        root: {
            color: `${lightPalette.primary.contrastText} !important`,
            backgroundColor: `${lightPalette.primary.main} !important`,
        },
    },
};

