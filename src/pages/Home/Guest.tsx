import React, { useState } from 'react';

import Box from '@mui/material/Box';

import { useGuestStyles } from './styles';

import GuestHeader from '@core/Header/GuestHeader';
import Login from '@pages/Login/Login';

const Guest = () => {
    const classes = useGuestStyles();
    const [showLogin, setShowLogin] = useState(false);

    return (
        <Box className={classes.wrapper}>
            <GuestHeader />
            <Box className={classes.login_wrapper}>
                <Login />
            </Box>
        </Box>
    );
};

export default Guest;
