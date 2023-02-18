import { scaleTheme } from '../variables';
import typography from '../typography';
import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export const MuiTable = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            borderBottom: `1px solid ${!darkMode ? lightPalette.border : darkPalette.border}`,
            '& caption': {
                padding: scaleTheme.spacing(2, 4),
                borderTop: `1px solid ${!darkMode ? lightPalette.border : darkPalette.border}`,
            },
        },
    },
});

export const MuiTableRow = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            borderTop: `1px solid ${!darkMode ? lightPalette.border : darkPalette.border}`,
        },
        head: {
            borderTop: 0,
            boxShadow: !darkMode ? '0 1px 2px 1px rgb(63 63 68 / 8%)' : '0 1px 2px 1px rgb(255 255 255 / 5%)',
        },
        hover: {
            '&:hover': {
                backgroundColor: 'transparent',

                '&:nth-child(2n)': {
                    backgroundColor: !darkMode ? lightPalette.extraLight : darkPalette.extraLight,
                },
            },
        },
    },
});

export const MuiTableCell = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            ...typography(darkMode).body1,
            padding: scaleTheme.spacing(2, 4),
            borderBottom: 0,
        },
    },
});

////
//// MUI Data Table ////

export const MUIDataTable = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            fontSize: '1em',
        },
        responsiveScrollMaxHeight: {
            minHeight: 'calc(100vh - 235px)',
            maxHeight: 'none !important',
            paddingTop: '5px',
            marginTop: '-5px',
        },
        responsiveScroll: {
            minHeight: 'calc(100vh - 235px)',
            maxHeight: 'calc(100vh - 235px)',
        },
    },
});

export const MUIDataTableToolbar = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            minHeight: scaleTheme.spacing(4),
        },
        left: {
            paddingLeft: scaleTheme.spacing(4),
            fontSize: '1.2em',
        },
        actions: {
            paddingRight: scaleTheme.spacing(4),
        },
        MUIPaper: {
            boxShadow: 'none',
        },
        titleText: {
            ...typography(darkMode).h3,
            marginLeft: scaleTheme.spacing(1),
            marginTop: scaleTheme.spacing(1),
        },
        filterPaper: {
            minWidth: scaleTheme.spacing(60),
        },
    },
});

export const MUIDataTableHeadCell = (darkMode?: boolean) => ({
    styleOverrides: {
        fixedHeader: {
            background: 'none',
        },
        toolButton: {
            color: 'inherit',
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            lineHeight: '1.4em',
            paddingTop: 0,
            paddingBottom: 0,
            background: 'none',
            '&:hover': {
                backgroundColor: 'unset',
            },
        },
    },
});

export const MUIDataTableBodyRow = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            '&:nth-child(2n)': {
                backgroundColor: !darkMode ? lightPalette.extraLight : 'rgba(255,255,255,0.2)',
            },
        },
    },
});

export const MUIDataTableBodyCell = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            color: !darkMode ? lightPalette.primary.main : darkPalette.primary.main,
        },
    },
});

export const MUIDataTableFilter = (darkMode?: boolean) => ({
    styleOverrides: {
        resetLink: {
            color: !darkMode ? lightPalette.primary.main : darkPalette.primary.main,
        },
    },
});

export const MUIDataTableFilterList = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            // marginBottom: scaleTheme.spacing(1),
        },
    },
});

export const MUIDataTableFooter = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            borderBottom: 'none',
        },
    },
});

