import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Configuration } from './config';

import { RootState } from '@services/index';
import { userSelector, setDarkMode } from '@services/userService';

import routes from '@pages/routes';
import Layout from '@core/Layout/Layout';

import { theme } from './theme';

const App = ({ user, darkMode }: AppReduxProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const darkModeStorage = localStorage.getItem('darkMode') === 'true';
        if (darkModeStorage !== darkMode) {
            dispatch(setDarkMode({ darkMode: darkModeStorage }));
        }
    }, []);

    return (
        <ThemeProvider theme={theme(darkMode)}>
            <CssBaseline />
            <Layout hideMenu={Configuration.HIDE_MENU}>
                <Routes>
                    {routes(user).map(({ page: Page, status, ...route }) => (
                        <Route key={route.path} element={<Page />} {...route} />
                    ))}
                </Routes>
            </Layout>
        </ThemeProvider>
    );
};

const mapStateToProps = (state: RootState) => {
    const { user, darkMode } = userSelector(state);
    return { user, darkMode };
};

const connector = connect(mapStateToProps);
type AppReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(App);

