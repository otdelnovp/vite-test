import React, { useState } from 'react';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import UniversalInput from '@core/UniversalInput/UniversalInput';
import { DatePickerInput } from '@core/DatePicker/DatePicker';
import { SelectInput } from '@core/UniversalInput/SelectInput';
import { MaskedInput } from '@core/UniversalInput/MaskedInput';
import { Loader } from '@core/Loader/Loader';

import { userRoles, userPositions } from '@helpers/dictionariesHelper';
import { momentToFormatString, startOfDay } from '@helpers/dateHelper';

import { useLkStyles } from '@pages/Lk/styles';
import { IUserData, findUserErrors, validate } from '@pages/Lk/methods';

interface IUserEdit {
    isLoadingItem: boolean;
    userItem: IUserData;
    onSave: (newUser: any) => void;
    onClose: () => void;
}

export const UserEdit = ({ isLoadingItem, userItem, onSave, onClose }: IUserEdit) => {
    const classes = useLkStyles();

    const [changed, setChanged] = useState(false);
    const [body, changeBody] = useState({ ...userItem });

    const [isErrorMessage, setErrorMessage] = useState(false);
    const [touched, setTouched] = useState({
        UserName: false,
        BirthDate: false,
        EMail: false,
        Phone: false,
        Roles: false,
        PositionCode: false,
        Passport: false,
        PassportDate: false,
        PassportIssuer: false,
        DriverLicense: false,
        DriverLicenseDate: false,
        Comment: false,
    });
    const [required, setRequired] = useState({
        UserName: true,
        BirthDate: false,
        EMail: true,
        Phone: true,
        Roles: true,
        PositionCode: true,
        Passport: false,
        PassportDate: false,
        PassportIssuer: false,
        DriverLicense: false,
        DriverLicenseDate: false,
        Comment: false,
    });

    React.useEffect(() => {
        changeBody(userItem);
        setRequired({ ...required, BirthDate: userItem.PositionCode === 'DRV' });
    }, [userItem]);

    const onFieldChange = (event: any) => {
        const { name, value } = event.target;
        setChanged(true);
        const newBody = { ...body, [name]: value };
        if (name === 'PositionCode') {
            setRequired({ ...required, BirthDate: value === 'DRV' });
        }
        changeBody(newBody);
    };

    const handleTouched = (event: any) => {
        setTouched({ ...touched, [event.target.name]: true });
    };

    const validationErrors = findUserErrors(body, required);
    const isValidForm = validate(validationErrors);

    const handleSubmit = () => {
        if (isValidForm) {
            onSave(body);
        } else {
            setTouched(required);
            setErrorMessage(true);
            setTimeout(() => setErrorMessage(false), 3000);
        }
    };

    return (
        <Dialog open={true} onClose={onClose} fullWidth={true} maxWidth="sm">
            <DialogTitle>{body?.UserId ? 'Редактирование' : 'Добавление'} сотрудника</DialogTitle>
            <DialogContent>
                {isErrorMessage && (
                    <DialogContentText id="alert-dialog-description">Заполните правильно все поля</DialogContentText>
                )}
                {isLoadingItem || !body ? (
                    <Loader />
                ) : (
                    <form className={classes.editForm}>
                        <Grid container spacing={2}>
                            <Grid item xs={7}>
                                <UniversalInput
                                    name="UserName"
                                    required={required.UserName}
                                    label="Имя сотрудника"
                                    value={body.UserName}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.UserName && validationErrors.UserName}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <DatePickerInput
                                    value={body.BirthDate || ''}
                                    name="BirthDate"
                                    label="Дата рождения"
                                    views={['day']}
                                    onChange={(date: any, fieldName) =>
                                        onFieldChange({
                                            target: { name: fieldName, value: momentToFormatString(startOfDay(date)) },
                                        })
                                    }
                                    onBlur={handleTouched}
                                    required={required.BirthDate}
                                    error={touched.BirthDate && validationErrors.BirthDate}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <UniversalInput
                                    name="EMail"
                                    required={required.EMail}
                                    label="EMail"
                                    value={body.EMail}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.EMail && validationErrors.EMail}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <MaskedInput
                                    mode="phone"
                                    name="Phone"
                                    required={required.Phone}
                                    label="Телефон"
                                    value={body.Phone ? body.Phone + '' : ''}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.Phone && validationErrors.Phone}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <SelectInput
                                    name="Roles"
                                    label="Роль в компании"
                                    placeholder="Выберите роль сотрудника"
                                    multiple={true}
                                    value={body.Roles || []}
                                    options={userRoles.map((role) => ({
                                        id: role.Code,
                                        value: role.Code,
                                        text: role.Name,
                                    }))}
                                    onChange={onFieldChange}
                                    error={touched.Roles && validationErrors.Roles}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <SelectInput
                                    name="PositionCode"
                                    label="Должность"
                                    placeholder="Выберите должность сотрудника"
                                    value={body.PositionCode || ''}
                                    options={userPositions.map((position) => ({
                                        id: position.Code,
                                        value: position.Code,
                                        text: position.Name,
                                    }))}
                                    onChange={onFieldChange}
                                    error={touched.PositionCode && validationErrors.PositionCode}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={7}>
                                <MaskedInput
                                    mode="passport"
                                    name="Passport"
                                    required={required.Passport}
                                    label="Серия и номер паспорта"
                                    value={body.Passport || ''}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.Passport && validationErrors.Passport}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <DatePickerInput
                                    name="PassportDate"
                                    value={body.PassportDate || ''}
                                    label="Когда выдан паспорт"
                                    views={['day']}
                                    onChange={(date: any, fieldName) =>
                                        onFieldChange({
                                            target: { name: fieldName, value: momentToFormatString(startOfDay(date)) },
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <UniversalInput
                                    name="PassportIssuer"
                                    required={required.PassportIssuer}
                                    label="Кем выдан паспорт"
                                    value={body.PassportIssuer}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.PassportIssuer && validationErrors.PassportIssuer}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={7}>
                                <MaskedInput
                                    mode="driver"
                                    name="DriverLicense"
                                    required={required.DriverLicense}
                                    label="Серия и номер ВУ"
                                    value={body.DriverLicense || ''}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.DriverLicense && validationErrors.DriverLicense}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <DatePickerInput
                                    name="DriverLicenseDate"
                                    value={body.DriverLicenseDate || ''}
                                    label="Когда выдано ВУ"
                                    views={['day']}
                                    onChange={(date: any, fieldName) =>
                                        onFieldChange({
                                            target: { name: fieldName, value: momentToFormatString(startOfDay(date)) },
                                        })
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <UniversalInput
                                    name="Comment"
                                    required={required.Comment}
                                    label="Комментарий о сотруднике"
                                    value={body.Comment}
                                    onChange={onFieldChange}
                                    onBlur={handleTouched}
                                    error={touched.Comment && validationErrors.Comment}
                                />
                            </Grid>
                        </Grid>
                    </form>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} variant="outlined">
                    Отмена
                </Button>
                <Button onClick={handleSubmit} disabled={!changed} variant="contained">
                    {body?.UserId ? 'Сохранить' : 'Добавить'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
