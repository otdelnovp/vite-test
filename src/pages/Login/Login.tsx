import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { AppDispatch } from '../../index';
import { compose } from 'redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

import { MaskedInput } from '@core/UniversalInput/MaskedInput';

import { RootState } from '@services/index';
import { auth, fakeAuth, userSelector } from '@services/userService';
import { getUserList } from '@services/lkService';

import { getYearStr } from '@helpers/methods';
import { emptyLoginBody, validateLoginFields, prepareAuthData } from './methods';

import { useLoginStyles } from './styles';
import LoadingButton from '@core/LoadingButton/LoadingButton';

import { isOuterAuth } from '../../helpers/authHelper';
import { Configuration } from '@/config';

export interface ILogin {
    light?: boolean;
}

const Login = ({ isLoading, user, light }: LoginReduxProps) => {
    const classes = useLoginStyles();
    const dispatch = useDispatch<AppDispatch>();
    //const history = useHistory();
    const navigate = useNavigate();
    const location = useLocation();

    const [body, setBody] = useState({ ...emptyLoginBody });

    const [touched, setTouched] = useState({
        email: false,
        phone: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const autoAuth = () => {
        // если передали юзера и пароль в строке - авторизовать
        const { isAuthPath, login, password } = isOuterAuth(location);
        if (isAuthPath) {
            dispatch(
                auth(
                    { Login: login, Hash: password },
                    {
                        onSuccess: onLoginSuccess,
                    },
                ),
            );
        }
    };

    const onToggleShowPassword = (event: any) => {
        setShowPassword(!showPassword);
        event.stopPropagation();
        event.preventDefault();
    };

    const [loginMode, setLoginMode] = useState('email');
    const onToggleLoginMode = (event: React.MouseEvent<HTMLElement>, value: string) => {
        if (value?.length) {
            setLoginMode(value);
            setBody({ ...emptyLoginBody });
        }
    };

    if (user?.UserId) return null;

    const onLoginFieldChange = (event: any) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value });
    };
    const onRememberFieldChange = (event: any) => {
        setBody({ ...body, remember: event.target.checked });
    };

    const onLoginKeyUp = (event: any) => {
        if (event.keyCode === 13) {
            onLogin();
        }
    };

    const onLogin = (e?: any) => {
        e?.preventDefault();
        const hasErrors = Object.values(validationErrors).find((item: boolean) => item);
        if (hasErrors) {
            setTouched({
                email: true,
                phone: true,
                password: true,
            });
        } else {
            dispatch(
                auth(prepareAuthData(body), {
                    onSuccess: onLoginSuccess,
                }),
            );
        }
    };

    const onFakeLogin = (e?: any) => {
        e?.preventDefault();
        const hasErrors = Object.values(validationErrors).find((item: boolean) => item);
        if (hasErrors) {
            setTouched({
                email: true,
                phone: true,
                password: true,
            });
        } else {
            dispatch(
                getUserList(
                    null,
                    {},
                    { page_number: 1, page_size: 1000 },
                    {
                        onSuccess: (response) => {
                            const currentUser = response?.rows?.find((usr: any) => usr.email);
                            console.log(currentUser, response?.rows);
                            if (currentUser)
                                dispatch(
                                    fakeAuth(currentUser.id, {
                                        onSuccess: onLoginSuccess,
                                    }),
                                );
                        },
                    },
                ),
            );
        }
    };

    const onLoginSuccess = () => {
        //history.push('/');
        navigate('/');
    };

    const validationErrors = validateLoginFields(body);

    const loginForm = (
        <Box className={classes.login}>
            <Typography component="h1" variant="h5" gutterBottom>
                Вход на портал Kamotive
            </Typography>
            {Configuration.API_URL}
            <form
                className={clsx(classes.form, {
                    [classes.formLight]: light,
                })}
                onSubmit={onFakeLogin}
                noValidate
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box className={classes.loginInput}>
                            {loginMode === 'email' ? (
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email"
                                    // placeholder="Введите Ваш Email"
                                    name="email"
                                    autoComplete="email"
                                    error={touched.email && validationErrors.email}
                                    value={body.email}
                                    onKeyUp={onLoginKeyUp}
                                    onChange={onLoginFieldChange}
                                />
                            ) : (
                                <MaskedInput
                                    required
                                    mode="phone"
                                    name="phone"
                                    label="Телефон"
                                    // placeholder="Введите Ваш номер телефона"
                                    autoComplete="tel"
                                    value={body.phone ? body.phone + '' : ''}
                                    onChange={onLoginFieldChange}
                                    error={touched.phone && validationErrors.phone}
                                />
                            )}
                            <Box className={classes.loginMode}>
                                <ToggleButtonGroup value={loginMode} exclusive onChange={onToggleLoginMode}>
                                    <ToggleButton value="email">
                                        <Tooltip title="Войти по Email">
                                            <AlternateEmailIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="phone">
                                        <Tooltip title="Войти по номеру телефона">
                                            <PhoneIphoneIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="filled"
                            required
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            label="Пароль"
                            placeholder="Введите Ваш пароль"
                            autoComplete="current-password"
                            error={touched.password && validationErrors.password}
                            value={body.password}
                            onKeyUp={onLoginKeyUp}
                            onChange={onLoginFieldChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton disableFocusRipple aria-label="toggle password visibility" onMouseDown={onToggleShowPassword}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    className={classes.remember}
                                    color="primary"
                                    name={'remember'}
                                    checked={body.remember}
                                    onChange={onRememberFieldChange}
                                />
                            }
                            label="Запомнить меня"
                        />
                        <LoadingButton
                            type="submit"
                            title={'Войти'}
                            onClick={onFakeLogin}
                            className={classes.submit}
                            size="large"
                            variant="contained"
                            color="primary"
                            isLoading={isLoading}
                            fullWidth={true}
                        />
                        <Box mt={2}>
                            <Typography align="center">
                                <Link to="/restore-password">Забыли пароль?</Link>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );

    useEffect(() => {
        console.log('autoAuth');
        autoAuth();
    }, []);

    return light ? (
        loginForm
    ) : (
        <Container component="main">
            <Paper className={classes.content}>{loginForm}</Paper>
        </Container>
    );
};

const mapStateToProps = (state: RootState) => {
    const { isLoading, user } = userSelector(state);
    return { isLoading, user };
};

const connector = connect(mapStateToProps);
type LoginReduxProps = ConnectedProps<typeof connector> & ILogin;

export default compose(connector)(Login);
