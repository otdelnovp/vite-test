import { scaleTheme } from '../variables';

export const MuiDialogTitle = {
    styleOverrides: {
        root: {
            fontSize: '1.2em',
            padding: scaleTheme.spacing(4, 5, 3),
            [scaleTheme.breakpoints.down('md')]: {
                textAlign: 'center',
            },
        },
    },
};

export const MuiDialogContent = {
    styleOverrides: {
        root: {
            padding: scaleTheme.spacing(4, 5),
            '&:after': {
                content: '""',
                display: 'block',
                position: 'relative' as const,
                height: 10,
            },
        },
    },
};

export const MuiDialogActions = {
    styleOverrides: {
        root: {
            padding: scaleTheme.spacing(0, 5, 4),
        },
    },
};

