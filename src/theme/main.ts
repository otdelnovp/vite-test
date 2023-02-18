import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import { Theme, BreakpointsOptions } from '@mui/material/styles';

declare module '@mui/styles' {
    interface DefaultTheme extends Theme {}
}

export const primaryColor = '#14467B';
export const primaryColorDark = '#14467B';
export const secondaryColor = '#D50032';
export const lightBlueColor = '#1976d2';
export const primaryLightBgColor = '#F5FDFE';
export const primaryMiddleBgColor = '#E6F4F4';
export const negativeColor = 'red';
export const positiveColor = 'LimeGreen';
export const blackColor = '#14467B'; //'#11142D';
export const greyColor = '#14467B'; //'#F4F5F7';
export const greyTextColor = '#777781';

export const darkBackground = '#1F1F1F';

const spacing = 8;
const breakpoints: BreakpointsOptions = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

export const theme = createTheme({ breakpoints }, ruRU);

import lightPalette from './lightPalette';
import darkPalette from './darkPalette';
import typography from './typography';
import components from './components';

const globalThemeMUI = createTheme(
    {
        spacing,
        breakpoints,
        palette: lightPalette,
        typography: typography(),
        components: components(),
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
    },
    ruRU,
);

const globalThemeMUIDark = createTheme(
    {
        spacing,
        breakpoints,
        palette: { ...darkPalette, mode: 'dark' },
        typography: typography(true),
        components: components(true),
        zIndex: {
            appBar: 1200,
            drawer: 1100,
        },
    },
    ruRU,
);

export { globalThemeMUI, globalThemeMUIDark };
