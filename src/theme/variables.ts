import { createTheme } from '@mui/material/styles';
import { BreakpointsOptions } from '@mui/material/styles';

export const spacing = 8;

export const breakpoints: BreakpointsOptions = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

export const zIndex = {
    appBar: 1200,
    drawer: 1100,
};

export const scaleTheme = createTheme({ spacing, breakpoints });

