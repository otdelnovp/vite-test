import React, { useState } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailIcon from '@mui/icons-material/Mail';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

import LoadingButton from '@core/LoadingButton/LoadingButton';
import { MaskedInput } from '@core/UniversalInput/MaskedInput';

import { RootState } from '@services/index';
import { restorePassword, setNewPassword, userSelector } from '@services/userService';

import {
    emptyRestorePasswordBody,
    validateRestorePasswordFields,
    validateSetNewPasswordFields,
    prepareSetNewPasswordData,
} from './methods';

import { useRestorePasswordStyles } from './styles';
import { AppDispatch } from "../../index";

const RestorePasswordForm = ({ user }: RestorePasswordFormContainerReduxProps) => {
    const classes = useRestorePasswordStyles();
    const dispatch = useDispatch<AppDispatch>();
    //const history = useHistory();
    const navigate = useNavigate();
    
    //@ts-ignore
    const { restoreCode } = useParams();

    const [body, setBody] = useState({ ...emptyRestorePasswordBody });
    const [touched, setTouched] = useState({
        email: false,
        phone: false,
        password: false,
        retryPassword: false,
    });

    const [restoreMode, setRestoreMode] = useState('email');
    const onToggleRestoreMode = (event: React.MouseEvent<HTMLElement>, value: string) => {
        if (value?.length) {
            setRestoreMode(value);
            setBody({ ...emptyRestorePasswordBody });
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = (event: any) => {
        setShowPassword(!showPassword);
        event.stopPropagation();
        event.preventDefault();
    };

    const onRestorePasswordFieldChange = (event: any) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value });
    };

    const [buttonState, setButtonState] = useState({
        isLoading: false,
        isSuccess: false,
        isError: false,
    });

    const showErrorButton = () => {
        setButtonState({
            ...buttonState,
            isLoading: false,
            isError: true,
        });
        setTimeout(() => {
            setButtonState({
                ...buttonState,
                isError: false,
            });
        }, 2000);
    };

    const onRestorePasswordSuccess = () => {
        setButtonState({
            ...buttonState,
            isLoading: false,
            isSuccess: true,
        });
    };

    const [, setCookie] = useCookies();

    const onRestorePassword = () => {
        const hasErrors = Object.values(errors).find((item: boolean) => item);
        if (hasErrors) {
            setTouched({
                email: true,
                phone: true,
                password: false,
                retryPassword: false,
            });
            showErrorButton();
        } else {
            setButtonState({
                ...buttonState,
                isLoading: true,
            });
            dispatch(
                restorePassword(body.email, {
                    onSuccess: onRestorePasswordSuccess,
                    onError: showErrorButton,
                }),
            );
        }
    };

    const onSetNewPassword = () => {
        const hasErrors = Object.values(errorsNew).find((item: boolean) => item);
        if (hasErrors) {
            setTouched({
                email: false,
                phone: false,
                password: true,
                retryPassword: true,
            });
            showErrorButton();
        } else {
            setButtonState({
                ...buttonState,
                isLoading: true,
            });
            dispatch(
                setNewPassword(prepareSetNewPasswordData(body.password, restoreCode!), {
                    onSuccess: () => {
                        onRestorePasswordSuccess();
                        //history.push('/login');
                        navigate('/login');
                    },
                    successText: 'Пароль успешно изменен',
                    onError: showErrorButton,
                }),
            );
        }
    };

    React.useEffect(() => {
        if (user?.UserId) {
            setCookie('user', JSON.stringify(user));
        }
    }, [user]);

    React.useEffect(() => {
        if (user?.UserId) {
            //history.push('/');
            navigate('/login');
        }
    }, []);

    const errors = validateRestorePasswordFields(body);
    const errorsNew = validateSetNewPasswordFields(body);

    if (user && user?.UserId) {
        return null;
    }

    const restoreForm = (
        <Box className={classes.restore}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" gutterBottom>
                Восстановление пароля
            </Typography>
            {!restoreCode ? (
                !buttonState.isSuccess ? (
                    <form className={classes.form} noValidate>
                        <Box className={classes.restoreInput}>
                            {restoreMode === 'email' ? (
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    required
                                    id="email"
                                    label="Email"
                                    placeholder="Введите Ваш Email"
                                    name="email"
                                    autoComplete="email"
                                    value={body.email}
                                    error={touched.email && errors.email}
                                    onChange={onRestorePasswordFieldChange}
                                />
                            ) : (
                                <MaskedInput
                                    required
                                    mode="phone"
                                    name="phone"
                                    label="Телефон"
                                    placeholder="Введите Ваш номер телефона"
                                    autoComplete="tel"
                                    value={body.phone ? body.phone + '' : ''}
                                    onChange={onRestorePasswordFieldChange}
                                    error={touched.phone && errors.phone}
                                />
                            )}
                            <Box className={classes.restoreMode}>
                                <ToggleButtonGroup value={restoreMode} exclusive onChange={onToggleRestoreMode}>
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
                        <LoadingButton
                            fullWidth
                            title="Восстановить"
                            onClick={onRestorePassword}
                            isLoading={buttonState.isLoading}
                            isError={buttonState.isError}
                            isSuccess={buttonState.isSuccess}
                            className={classes.submit}
                            variant="contained"
                            color="primary"
                            size="large"
                            isAsync={true}
                        />
                        {!buttonState.isSuccess && (
                            <Box mt={2}>
                                <Typography variant="body2" color="textSecondary" align="center">
                                    Вспомнили пароль? <Link to="/login">Авторизация</Link>
                                </Typography>
                            </Box>
                        )}
                    </form>
                ) : (
                    <Box className={classes.successMail}>
                        <MailIcon className={classes.successMailIcon} />
                        <Typography component="h3" variant="h5">
                            Ссылка на изменение пароля была отправлена на Email
                        </Typography>
                    </Box>
                )
            ) : (
                <form className={classes.form} noValidate>
                    <TextField
                        onChange={onRestorePasswordFieldChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Новый пароль"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="password"
                        value={body.password}
                        error={touched.password && errorsNew.password}
                        helperText={
                            touched.password && errorsNew.password && 'Введите новый пароль (не менее 7 символов)'
                        }
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        disableFocusRipple
                                        aria-label="toggle password visibility"
                                        onMouseDown={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        onChange={onRestorePasswordFieldChange}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="retryPassword"
                        label="Повторите новый пароль"
                        type={showPassword ? 'text' : 'password'}
                        id="retryPassword"
                        autoComplete="retry-password"
                        value={body.retryPassword}
                        error={touched.retryPassword && errorsNew.retryPassword}
                        helperText={touched.retryPassword && errorsNew.retryPassword && 'Пароль не совпадает'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        disableFocusRipple
                                        aria-label="toggle password visibility"
                                        onMouseDown={handleClickShowPassword}
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <LoadingButton
                        fullWidth
                        title="Изменить пароль"
                        onClick={onSetNewPassword}
                        isLoading={buttonState.isLoading}
                        isError={buttonState.isError}
                        isSuccess={buttonState.isSuccess}
                        className={classes.submit}
                        variant="contained"
                        color="primary"
                        size="large"
                        isAsync={true}
                    />
                    {!buttonState.isSuccess && (
                        <Box mt={2}>
                            <Typography variant="body2" color="textSecondary" align="center">
                                Вспомнили пароль? <Link to="/login">Авторизация</Link>
                            </Typography>
                        </Box>
                    )}
                </form>
            )}
        </Box>
    );

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.content}>{restoreForm}</Paper>
        </Container>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        user: userSelector(state).user,
    };
};

const connector = connect(mapStateToProps);
type RestorePasswordFormContainerReduxProps = ConnectedProps<typeof connector>;

export default compose(connector)(RestorePasswordForm);
