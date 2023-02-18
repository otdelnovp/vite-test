import { scaleTheme } from '../variables';

export default {
    styleOverrides: {
        root: {
            [scaleTheme.breakpoints.up('md')]: {
                paddingLeft: 0,
                paddingRight: 0,
            },
        },
    },
};
