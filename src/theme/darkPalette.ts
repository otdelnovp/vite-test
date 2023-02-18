// import { colors } from '@material-ui/core';

// ----- NEW THEME COLORS -----
const success = '#1A9D2B';
const error = '#DC3831';
const warning = '#E98F47';
const link = '#BCBDC0';
const dark = '#14467B';
const light = '#BCBDC0';
const extraLight = '#F3F5F8';
const white = '#FFFFFF';
const border = '#BCBDC0';
const background = '#454647';
const lightBackground = '#343536';
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
        contrastText: dark,
        dark: white,
        main: white,
        light: white,
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
        primary: extraLight,
        secondary: extraLight,
        link: extraLight,
    },
    background: {
        default: background,
        paper: lightBackground,
    },
    icon: extraLight,
    divider: extraLight,
};

