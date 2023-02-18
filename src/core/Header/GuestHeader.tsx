import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';

import { useGuestHeaderStyles } from './styles';

import logo from '@images/logo_outstroked.svg';

import { globalThemeMUI } from "@theme/main";

const GuestHeader = ({ user }: HeaderReduxProps) => {
    const classes = useGuestHeaderStyles();

    return (
        <AppBar position="static" elevation={0} className={classes.header} sx={{ background: globalThemeMUI.palette.primary.main }}>
            <Container maxWidth={false}>
                <Toolbar className={classes.toolbar}>
                    <Link to="/" className={classes.logo}>
                        <img src={logo} alt="Kamotive" />
                    </Link>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type HeaderReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(GuestHeader);
