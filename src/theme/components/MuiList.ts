import { scaleTheme } from '../variables';

export const MuiListItem = {
    styleOverrides: {
        root: {
            marginBottom: 1,
            '&.Mui-selected, &.Mui-selected:hover': {
                // color: '#fff',
                // backgroundColor: lightBlueColor,
            },
        },
    },
};
export const MuiListItemIcon = {
    styleOverrides: {
        root: {
            minWidth: scaleTheme.spacing(4),
        },
    },
};

