import React from 'react';

import Box from '@mui/material/Box';

import { useNotFoundStyles } from './styles';

import notFound from '@images/404.png';

const NotFound = () => {
    const classes = useNotFoundStyles();
    return (
        <Box className={classes.notFound}>
            <img src={notFound} alt="" />
        </Box>
    );
};

export default NotFound;
