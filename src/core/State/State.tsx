import React from 'react';

import Box from '@mui/material/Box';

import { useStateStyles } from './styles';

export interface IStateProps {
    title: string | null;
    state: string | null;
}

export const State = ({ title, state }: IStateProps) => {
    const classes = useStateStyles();
    return (
        <Box className={classes.state} key={state}>
            {title}
        </Box>
    );
};
