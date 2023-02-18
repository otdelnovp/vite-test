import React from 'react';
import { useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import clsx from 'clsx';

import { RootState } from '@services/index';
import { userSelector } from '@services/userService';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { useFooterStyles } from './styles';

const Footer = ({ user }: FooterReduxProps) => {
    const classes = useFooterStyles();
    const location = useLocation();
    const light = !user && location?.pathname === '/';

    const content = (
        <Box className={classes.inner}>
            <Box className={classes.contact}>
                Единый номер програмной поддержки: 8 800 234 66 22 (звонок бесплатный)
            </Box>
            <Box className={classes.social}>social links</Box>
        </Box>
    );

    return (
        <Box
            className={clsx(classes.footer, {
                [classes.footerLight]: light,
            })}
        >
            {!light ? <Container>{content}</Container> : content}
        </Box>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user } = userSelector(state);
    return { user };
};

const connector = connect(mapStateToProps);
type FooterReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(Footer);
