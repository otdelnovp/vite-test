// import { colors } from '@material-ui/core';

// ----- NEW THEME COLORS -----
const success = '#1A9D2B';
const error = '#DC3831';
const warning = '#E98F47';
const link = '#1C5BA4';
const dark = '#14467B';
const light = '#BCBDC0';
const extraLight = '#F3F5F8';
const white = '#FFFFFF';
const border = '#B9CBDA';
const background = '#FFFFFF';
const lightBackground = '#F5F7FA';
const gradient = 'linear-gradient(90deg, #14467B, #1C5BA4)';

export default {
    dark,
    white,
    link,
    light,
    border,
    extraLight,
    gradient,
    primary: {
        contrastText: white,
        dark,
        main: dark,
        light: dark,
    },
    secondary: {
        contrastText: white,
        dark: light,
        main: light,
        light,
    },
    success: {
        contrastText: white,
        dark: success,
        main: success,
        light: success,
    },
    info: {
        contrastText: white,
        dark: light,
        main: light,
        light,
    },
    warning: {
        contrastText: white,
        dark: warning,
        main: warning,
        light: warning,
    },
    error: {
        contrastText: white,
        dark: error,
        main: error,
        light: error,
    },
    text: {
        primary: dark,
        secondary: light,
        link: dark,
    },
    background: {
        default: background,
        paper: lightBackground,
    },
    icon: dark,
    divider: extraLight,
};

