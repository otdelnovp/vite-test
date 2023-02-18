import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';

export default {
    styleOverrides: {
        root: {
            width: scaleTheme.spacing(5.75),
            height: scaleTheme.spacing(3.25),
            padding: 0,
            marginLeft: scaleTheme.spacing(1),
            marginRight: scaleTheme.spacing(1),
        },
        switchBase: {
            padding: 1,
            opacity: 1,
            border: 'none',
            '&$checked': {
                color: `${lightPalette.background.default} !important`,
            },
            '&$checked + $track': {
                backgroundColor: `${lightPalette.success.main} !important`,
            },
        },
        thumb: {
            width: scaleTheme.spacing(3),
            height: scaleTheme.spacing(3),
        },
        track: {
            borderRadius: scaleTheme.spacing(1.63),
            border: 'none',
            opacity: '1 !important',
            backgroundColor: `${lightPalette.error.main} !important`,
        },
        checked: {},
        focusVisible: {},
        disabled: {},
    },
};

