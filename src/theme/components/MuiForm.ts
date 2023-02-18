import { scaleTheme } from '../variables';
import lightPalette from '../lightPalette';
import darkPalette from '../darkPalette';

export const MuiFormLabel = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            // top: '4px !important',
        },
    },
});

export const MuiInputLabel = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
        },
        filled: {
            position: 'relative' as const,
            transform: 'none !important',
            marginBottom: scaleTheme.spacing(1),
            color: !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
            fontWeight: 400,
            fontSize: '0.9em',
        },
        outlined: {
            transform: 'translate(14px, 13px) scale(1)',
            '-webkit-text-fill-color': !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
            '&.MuiInputLabel-shrink': {
                padding: scaleTheme.spacing(0, 2),
                background: '#fff',
            },
        },
    },
});

export const MuiFilledInput = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            //backgroundColor: greyColor,
            borderRadius: '0.8em !important',
            '&:hover': {
                //backgroundColor: greyColor,
                boxShadow: `inset 0 0 1px ${lightPalette.dark}`,
            },
            '&.Mui-focused': {
                //backgroundColor: '#fff',
                boxShadow: `inset 0 0 0 1px ${lightPalette.dark}`,
            },
            '&.Mui-disabled': {
                //backgroundColor: `${greyColor} !important`,
            },
            '&.MuiAutocomplete-inputRoot': {
                paddingTop: '0 !important',
                paddingLeft: '0 !important',
            },
        },
        underline: {
            '&:before': {
                display: 'none',
            },
            '&:after': {
                display: 'none',
            },
        },
        input: {
            '-webkit-text-fill-color': !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
            color: lightPalette.dark,
            height: '1.186em',
            padding: `${scaleTheme.spacing(1.5)} ${scaleTheme.spacing(1.5)}  ${scaleTheme.spacing(1.5)}  ${scaleTheme.spacing(2.5)} !important`,
            '&.Mui-disabled': {
                background: `none !important`,
            },
        },
        inputMultiline: {
            padding: `0 ${scaleTheme.spacing(2)}  0  ${scaleTheme.spacing(3)} !important`,
        },
        adornedEnd: {
            paddingRight: scaleTheme.spacing(0.5),
            '& .MuiInputAdornment-filled.MuiInputAdornment-positionStart:not(.MuiInputAdornment-hiddenLabel)': {
                marginTop: 0,
                marginRight: 0,
            },
            '& .MuiFilledInput-input': {
                paddingRight: `${scaleTheme.spacing(1)} !important`,
            },
        },
    },
});

export const MuiOutlinedInput = (darkMode?: boolean) => ({
    styleOverrides: {
        root: {
            padding: 0,
        },
        input: {
            padding: '16px 14px !important',
            height: 'auto',
            '-webkit-box-shadow': `inset 0 0 0 25px ${!darkMode ? lightPalette.background.default : darkPalette.background.default}`,
            '-webkit-text-fill-color': !darkMode ? lightPalette.text.primary : darkPalette.text.primary,
            borderRadius: 0,
        },
    },
});

export const MuiInputAdornment = () => ({
    styleOverrides: {
        positionEnd: {
            marginRight: 8,
        },
    },
});

