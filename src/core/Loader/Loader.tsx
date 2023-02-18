import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useLoaderStyles } from './styles';

export interface ILoaderProps {
    className?: string;
    color?: 'primary' | 'secondary' | 'inherit' | undefined;
}

export const Loader = ({ color }: ILoaderProps) => {
    const classes = useLoaderStyles();
    return (
        <Box component="div" className={classes.loader}>
            <CircularProgress variant={'indeterminate'} disableShrink color={color} />
        </Box>
    );
};
