import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
// import { Theme } from '@mui/material/styles';

import lightPalette from './lightPalette';
import darkPalette from './darkPalette';
import typography from './typography';
import components from './components';

import { spacing, breakpoints, zIndex } from './variables';

// declare module '@mui/styles' {
//     interface DefaultTheme extends Theme {}
// }

export const globalThemeMUI = createTheme(
    {
        spacing,
        breakpoints,
        palette: { ...lightPalette, mode: 'light' },
        typography: typography(),
        components: components(),
        zIndex,
    },
    ruRU,
);

export const globalThemeMUIDark = createTheme(
    {
        spacing,
        breakpoints,
        palette: { ...darkPalette, mode: 'dark' },
        typography: typography(true),
        components: components(true),
        zIndex,
    },
    ruRU,
);

export const theme = (currentDarkMode: boolean = localStorage.getItem('darkMode') === 'true') =>
    !currentDarkMode ? globalThemeMUI : globalThemeMUIDark;

